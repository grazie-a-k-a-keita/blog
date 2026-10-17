import dayjs from "dayjs";

/** 表示と <time datetime> の両方で使う日付の書式 */
export function formatDate(date: Date) {
	return dayjs(date).format("YYYY-MM-DD");
}
