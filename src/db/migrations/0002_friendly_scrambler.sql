CREATE TABLE `profile_data` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text,
	`age` integer NOT NULL,
	`gender` text NOT NULL,
	`activity_level` text NOT NULL,
	`height` integer NOT NULL,
	`weight` integer NOT NULL,
	`dietType` text NOT NULL,
	`allergies` text DEFAULT '[]' NOT NULL,
	`meals_data` text DEFAULT '[]' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON UPDATE no action ON DELETE cascade
);
