// api/supabase/functions/homeupload/index.js

import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY // use service role for write permissions
);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end("Only POST allowed");

  const { file, filename } = req.body;

  if (!file || !filename) {
    return res.status(400).json({ error: 'Missing file or filename' });
  }

  const buffer = Buffer.from(file, 'base64');

  const { data, error } = await supabase.storage
    .from('homepage-media')
    .upload(`videos/${filename}`, buffer, {
      contentType: 'video/mp4',
      upsert: true,
    });

  if (error) return res.status(500).json({ error });

  const { publicUrl } = supabase.storage
    .from('homepage-media')
    .getPublicUrl(`videos/${filename}`);

  res.status(200).json({ url: publicUrl });
}
