// Sessions from this number to the last one are locked on the website (they show a lock and cannot be opened).
// Set to 0 or a number past the last session to unlock everything. Session numbers start at 1.
export const LOCK_FROM = 5

export const isLocked = (index: number) => LOCK_FROM > 0 && index + 1 >= LOCK_FROM
