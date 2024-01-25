/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import { type RecordService } from 'pocketbase'

export enum Collections {
	Episodes = "episodes",
	EpisodesShow = "episodes_show",
	EpisodesTag = "episodes_tag",
	Nowplaying = "nowplaying",
	Playlists = "playlists",
	Projects = "projects",
	ScheduledItems = "scheduled_items",
	Schedules = "schedules",
	Shows = "shows",
	Tags = "tags",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export type EpisodesRecord = {
	audio?: string
	author?: string
	credits?: string
	date?: IsoDateString
	description?: HTMLString
	image?: string
	playlists?: RecordIdString[]
	public?: boolean
	show?: RecordIdString
	slug?: string
	tags?: RecordIdString[]
	title?: string
	tracklist?: HTMLString
}

export type EpisodesShowRecord = {
	count?: number
	show?: RecordIdString
}

export type EpisodesTagRecord = {
	episodes?: number
	tags?: RecordIdString[]
}

export type NowplayingRecord = {
	artist?: string
	episode?: RecordIdString
	is_live?: boolean
	slug?: string
	title?: string
}

export type PlaylistsRecord = {
	title?: string
}

export type ProjectsRecord = {
	about?: HTMLString
	bandcamp?: string
	email?: string
	facebook?: string
	impressum?: HTMLString
	instagram?: string
	name: string
	support?: string
	telegram?: string
	website?: string
	youtube?: string
}

export type ScheduledItemsRecord = {
	artist?: string
	date?: IsoDateString
	episode?: RecordIdString
	schedule?: RecordIdString
	title?: string
}

export type SchedulesRecord = {
	date?: IsoDateString
	info?: string
	manual?: boolean
}

export type ShowsRecord = {
	author?: string
	description?: HTMLString
	slug?: string
	title?: string
}

export type TagsRecord = {
	tag?: string
}

export type UsersRecord = never

// Response types include system fields and match responses from the PocketBase API
export type EpisodesResponse<Texpand = unknown> = Required<EpisodesRecord> & BaseSystemFields<Texpand>
export type EpisodesShowResponse<Texpand = unknown> = Required<EpisodesShowRecord> & BaseSystemFields<Texpand>
export type EpisodesTagResponse<Texpand = unknown> = Required<EpisodesTagRecord> & BaseSystemFields<Texpand>
export type NowplayingResponse<Texpand = unknown> = Required<NowplayingRecord> & BaseSystemFields<Texpand>
export type PlaylistsResponse<Texpand = unknown> = Required<PlaylistsRecord> & BaseSystemFields<Texpand>
export type ProjectsResponse<Texpand = unknown> = Required<ProjectsRecord> & BaseSystemFields<Texpand>
export type ScheduledItemsResponse<Texpand = unknown> = Required<ScheduledItemsRecord> & BaseSystemFields<Texpand>
export type SchedulesResponse<Texpand = unknown> = Required<SchedulesRecord> & BaseSystemFields<Texpand>
export type ShowsResponse<Texpand = unknown> = Required<ShowsRecord> & BaseSystemFields<Texpand>
export type TagsResponse<Texpand = unknown> = Required<TagsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	episodes: EpisodesRecord
	episodes_show: EpisodesShowRecord
	episodes_tag: EpisodesTagRecord
	nowplaying: NowplayingRecord
	playlists: PlaylistsRecord
	projects: ProjectsRecord
	scheduled_items: ScheduledItemsRecord
	schedules: SchedulesRecord
	shows: ShowsRecord
	tags: TagsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	episodes: EpisodesResponse
	episodes_show: EpisodesShowResponse
	episodes_tag: EpisodesTagResponse
	nowplaying: NowplayingResponse
	playlists: PlaylistsResponse
	projects: ProjectsResponse
	scheduled_items: ScheduledItemsResponse
	schedules: SchedulesResponse
	shows: ShowsResponse
	tags: TagsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'episodes'): RecordService<EpisodesResponse>
	collection(idOrName: 'episodes_show'): RecordService<EpisodesShowResponse>
	collection(idOrName: 'episodes_tag'): RecordService<EpisodesTagResponse>
	collection(idOrName: 'nowplaying'): RecordService<NowplayingResponse>
	collection(idOrName: 'playlists'): RecordService<PlaylistsResponse>
	collection(idOrName: 'projects'): RecordService<ProjectsResponse>
	collection(idOrName: 'scheduled_items'): RecordService<ScheduledItemsResponse>
	collection(idOrName: 'schedules'): RecordService<SchedulesResponse>
	collection(idOrName: 'shows'): RecordService<ShowsResponse>
	collection(idOrName: 'tags'): RecordService<TagsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
