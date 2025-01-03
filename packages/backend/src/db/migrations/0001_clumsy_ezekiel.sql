ALTER TABLE "achievements" ALTER COLUMN "requirements" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "achievements" ALTER COLUMN "rewards" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "achievements" DROP COLUMN IF EXISTS "tier";--> statement-breakpoint
ALTER TABLE "achievements" DROP COLUMN IF EXISTS "hidden";--> statement-breakpoint
ALTER TABLE "hero_achievements" DROP COLUMN IF EXISTS "progress";