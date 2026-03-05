import { supabase } from '@/lib/supabase';
import { usePartnerStore } from '@/lib/stores/partner-store';

/**
 * Uploads a momentje photo to Supabase Storage and inserts a record.
 * Requires:
 * - A 'momentjes' bucket in Supabase Storage
 * - A 'momentjes' table in the database
 * - User to be logged in and coupled
 *
 * Falls back gracefully: returns null if anything fails.
 */
export async function uploadMomentjeToSupabase(
  imageUri: string,
  text: string | null,
): Promise<string | null> {
  try {
    const { userId, coupleId } = usePartnerStore.getState();
    if (!userId || !coupleId) return null;

    // Fetch the image as a blob
    const response = await fetch(imageUri);
    const blob = await response.blob();

    // Generate a unique filename
    const ext = imageUri.split('.').pop() ?? 'jpg';
    const filename = `${coupleId}/${userId}/${Date.now()}.${ext}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('momentjes')
      .upload(filename, blob, {
        contentType: `image/${ext === 'png' ? 'png' : 'jpeg'}`,
        upsert: false,
      });

    if (uploadError) {
      console.warn('Momentje upload failed:', uploadError.message);
      return null;
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('momentjes')
      .getPublicUrl(filename);

    // Insert record
    const { error: insertError } = await supabase.from('momentjes').insert({
      couple_id: coupleId,
      user_id: userId,
      photo_url: urlData.publicUrl,
      text,
    });

    if (insertError) {
      console.warn('Momentje record insert failed:', insertError.message);
      return null;
    }

    return urlData.publicUrl;
  } catch (err) {
    console.warn('Momentje sync failed:', err);
    return null;
  }
}
