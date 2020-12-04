export function addChineseUnit(number, decimalDigit) { // 数字添加单位
	var me = this;
	decimalDigit = decimalDigit == null ? 2 : decimalDigit;
	var integer = Math.floor(number);
	var digit = getDigit(integer);;
	// ['个', '十', '百', '千', '万', '十万', '百万', '千万'];
	var unit = [];
	if (digit > 3) {
		var multiple = Math.floor(digit / 8);
		if (multiple >= 1) {
			var tmp = Math.round(integer / Math.pow(10, 8 * multiple));
			unit.push(addWan(tmp, number, 8 * multiple, decimalDigit));
			for (var i = 0; i < multiple; i++) {
				unit.push('亿');
			}
			return unit.join('');
		} else {
			return addWan(integer, number, 0, decimalDigit);
		}
	} else {
		return number;
	}
}

function getDigit(integer) {
	var digit = -1;
	while (integer >= 1) {
		digit++;
		integer = integer / 10;
	}
	return digit;
}

function addWan(integer, number, mutiple, decimalDigit) {
	var me = this;
	var digit = getDigit(integer);
	if (digit > 3) {
		var remainder = digit % 8;
		if (remainder >= 5) { // ‘十万’、‘百万’、‘千万’显示为‘万’
			remainder = 4;
		}
		return Math.round(number / Math.pow(10, remainder + mutiple - decimalDigit)) / Math.pow(10, decimalDigit) + '万';
	} else {
		return Math.round(number / Math.pow(10, mutiple - decimalDigit)) / Math.pow(10, decimalDigit);
	}
}

export class Song {
  constructor({ id, name, singer, album, image, duration, url, like, isSearch, albumId }) {
    this.id = id
    this.name = name
    this.singer = singer
    this.album = album
    this.image = image
    this.duration = duration
    this.url = url
    this.like = like
    this.isSearch = isSearch
    this.albumId = albumId
  }
}

export function createPlayList(music) {
  return new Song({
    id: music.id,
    name: music.name,
    singer: music.artists.length > 0 && filterSinger(music.artists),
    album: music.album.name,
    albumId: music.album.id, 
    image: music.album.picUrl || null,
    duration: music.duration / 1000,
    url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`,
    like: music.like || false,
    isSearch: false
  })
}

export function createSheetToSong(music) {
  return new Song({
    id: music.id,
    name: music.name,
    singer: music.ar.length > 0 && filterSinger(music.ar),
    album: music.al.name,
    albumId: music.al.id, 
    image: music.al.picUrl || null,
    duration: music.dt / 1000,
    url: `https://music.163.com/song/media/outer/url?id=${music.id}.mp3`,
    like: music.like || false,
    isSearch: false
  })
}

export function filterSinger(singers) {
  let arr = []
  singers.forEach(item => {
    arr.push(item.name)
  })
  return arr.join('/')
}

// 时间格式化
export function format(value) {
  let minute = Math.floor(value / 60)
  let second = Math.floor(value % 60)
  return `${addZero(minute)}:${addZero(second)}`
}

// 补0函数
export function addZero(s) {
  return s < 10 ? '0' + s : s
}