-- Optional sample content for the Charity and Academics pages, so they don't
-- look empty before the family committee publishes real posts. Safe to skip,
-- and safe to edit or delete afterwards from Upload Dashboard > Charity /
-- Academics — these are ordinary rows, not special in any way.
-- Run after 003_community_features.sql.

insert into public.community_posts (category, title, description, published, created_at) values
(
  'charity',
  'Emergency Relief Fund',
  'A standing fund the family committee draws on to support members facing medical emergencies or sudden financial hardship. Reach out to the committee to request assistance, or to contribute.',
  true,
  now() - interval '30 days'
),
(
  'charity',
  'Scholarship Support Program',
  'Need-based financial support for students within the family pursuing higher education. Applications are reviewed each academic year by the committee.',
  true,
  now() - interval '18 days'
),
(
  'charity',
  'Community Outreach Drives',
  'Periodic donation and outreach drives organized by the Therampu Kudumba Yogam youth wing, supporting causes beyond our own family circle.',
  true,
  now() - interval '5 days'
);

insert into public.community_posts (category, title, description, published, created_at) values
(
  'academics',
  'Annual Scholarship Awards',
  'Recognizing outstanding academic achievement among Therampu family students each year, presented at the annual family gathering.',
  true,
  now() - interval '25 days'
),
(
  'academics',
  'Higher Education Support',
  'Guidance and financial assistance for members pursuing undergraduate and postgraduate studies, coordinated through the family committee.',
  true,
  now() - interval '12 days'
),
(
  'academics',
  'Career Mentorship Circle',
  'Connecting students and young professionals in the family with mentors across different fields, to share guidance on education and career paths.',
  true,
  now() - interval '2 days'
);
