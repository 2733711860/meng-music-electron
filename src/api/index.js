/**
 * API命名配置列表
 * 命名规则：驼峰式命名方式，动词放前面，名词放后面，
 * 如:addFeatures
 * API命名变量不要太过长
 */
import { get } from './http.js'

export const baseUrl = `https://api.mtnhao.com`;

export const getBanner = params => get(`${baseUrl}/banner`, params) // 轮播图

export const getPersonalized = params => get(`${baseUrl}/personalized`, params) // 推荐歌单

export const getNewSongs = params => get(`${baseUrl}/personalized/newsong`, params) // 推荐新音乐

export const getPersonlMv = params => get(`${baseUrl}/personalized/mv`, params) // 推荐 mv

export const getHotSheetType = params => get(`${baseUrl}/playlist/hot`, params) // 热门歌单分类

export const getSheetType = params => get(`${baseUrl}/playlist/catlist`, params) // 歌单分类

export const getTopSheet = params => get(`${baseUrl}/top/playlist`, params) // 获取网友精选碟歌单

export const getRanks = params => get(`${baseUrl}/toplist`, params) // 所有榜单

export const getRankDetail = params => get(`${baseUrl}/top/list`, params) // 排行榜详情

export const getRankSinger = params => get(`${baseUrl}/toplist/artist`, params) // 歌手榜

export const getSingerByType = params => get(`${baseUrl}/artist/list`, params) // 根据分类获取歌手列表

export const getSheetDetail = params => get(`${baseUrl}/playlist/detail`, params) // 歌单详情

export const getMusicDetail = params => get(`${baseUrl}/song/detail`, params) // 歌曲详情

export const getSimiSheet = params => get(`${baseUrl}/related/playlist`, params) // 相关歌单推荐

export const getLikeUsers = params => get(`${baseUrl}/playlist/subscribers`, params) // 获取歌单收藏者

export const getSingerDetail = params => get(`${baseUrl}/artist/detail`, params) // 获取歌手详情

export const getSimiSinger = params => get(`${baseUrl}/simi/artist`, params) // 获得相似歌手

export const getSingerSong = params => get(`${baseUrl}/artists`, params) // 获取歌手单曲

export const getSingerMv = params => get(`${baseUrl}/artist/mv`, params) // 获取歌手 mv

export const getSingerAlbum = params => get(`${baseUrl}/artist/album`, params) // 获取歌手专辑

export const getLyric = params => get(`${baseUrl}/lyric`, params) // 获取歌词







export const getBookByWord = params => get(`${baseUrl}/search/wordbook`, params) // 根据关键字查询书籍

export const getBookChapter = params => get(`${baseUrl}/get/chapter`, params) // 获取章节

export const getCrawlChapter = params => get(`${baseUrl}/crawl/chapter`, params) // 爬取章节

export const getHotWord = params => get(`${baseUrl}/search/hotWord`, params) // 获取搜索热词

export const getBookDetail = params => get(`${baseUrl}/crawl/detail`, params) // 获取书籍详情

export const getBookContent = params => get(`${baseUrl}/crawl/content`, params) // 获取正文(爬取)

export const getContent = params => get(`${baseUrl}/get/content`, params) // 获取正文

export const crawlBookTosql = params => get(`${baseUrl}/crawl/book`, params) // 爬取书籍到数据库

export const crawlDetailsTosql = params => get(`${baseUrl}/crawl/alldetail`, params) // 从数据库获取bookId，批量爬取书籍详情并保存到数据库（阅读器用不到）


