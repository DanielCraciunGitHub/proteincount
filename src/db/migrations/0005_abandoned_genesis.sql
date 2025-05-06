PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_profile_data` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text,
	`name` text,
	`age` integer NOT NULL,
	`gender` text NOT NULL,
	`activity_level` text NOT NULL,
	`height` integer NOT NULL,
	`weight` integer NOT NULL,
	`dietType` text NOT NULL,
	`allergies` text DEFAULT '[]' NOT NULL,
	`meals_data` text DEFAULT '[]' NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
INSERT INTO `__new_profile_data`("id", "user_id", "name", "age", "gender", "activity_level", "height", "weight", "dietType", "allergies", "meals_data", "created_at", "updated_at") SELECT "id", "user_id", "name", "age", "gender", "activity_level", "height", "weight", "dietType", "allergies", "meals_data", "created_at", "updated_at" FROM `profile_data`;--> statement-breakpoint
DROP TABLE `profile_data`;--> statement-breakpoint
ALTER TABLE `__new_profile_data` RENAME TO `profile_data`;--> statement-breakpoint
PRAGMA foreign_keys=ON;