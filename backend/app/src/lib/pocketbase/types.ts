/**
* This file was @generated using pocketbase-typegen
*/

export enum Collections {
	Episodes = "episodes",
	EpisodesShow = "episodes_show",
	EpisodesTag = "episodes_tag",
	Nowplaying = "nowplaying",
	Playlists = "playlists",
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
	title?: string
	author?: string
	date?: IsoDateString
	description?: HTMLString
	slug?: string
	audio?: string
	image?: string
	show?: RecordIdString
	tags?: RecordIdString[]
	playlists?: RecordIdString[]
}

export type EpisodesShowRecord = {
	show?: RecordIdString
	count?: number
}

export type EpisodesTagRecord = {
	tags?: RecordIdString[]
	episodes?: number
}

export type NowplayingRecord = {
	title?: string
	artist?: string
	is_live?: boolean
	slug?: string
}

export type PlaylistsRecord = {
	title?: string
}

export type SchedulesRecord = {
	info?: string
	title?: string
	author?: string
	date?: IsoDateString
}

export type ShowsRecord = {
	title?: string
	author?: string
	description?: HTMLString
	slug?: string
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
	schedules: SchedulesResponse
	shows: ShowsResponse
	tags: TagsResponse
	users: UsersResponse
}