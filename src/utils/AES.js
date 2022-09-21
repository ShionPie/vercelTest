import CryptoJS from 'crypto-js'

// 加解密用到的密钥
const aesKey = '001122334455667778797A7B7C7D7E7F'// 秘钥
const key = CryptoJS.enc.Hex.parse(aesKey)// 将秘钥转换成Utf8字节数组
const iv = CryptoJS.enc.Hex.parse(aesKey)

// AES加密
export function encrypt(str) {
  const encrypt = CryptoJS.AES.encrypt(str, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypt.toString()
}

// AES解密
export function decrypt(str) {
  const decrypt = CryptoJS.AES.decrypt(str, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const original = wordArrayToByteArray(decrypt)
  if (original.length > 4) {
    const newOriginal = original.slice(4)
    const rawToken = String.fromCharCode.apply(String, newOriginal).split('|')
    if (rawToken !== undefined && rawToken !== null && rawToken.length > 0) {
      return rawToken[0]
    }
  }
  return null
}

export function wordArrayToByteArray(wordArray) {
  let length = wordArray.sigBytes
  wordArray = wordArray.words

  const result = []
  let bytes
  let i = 0

  while (length > 0) {
    bytes = wordToByteArray(wordArray[i], Math.min(4, length))
    length -= bytes.length
    result.push(bytes)
    i++
  }

  return result.flat()
}

export function wordToByteArray(word, length) {
  const ba = []
  const xFF = 0xFF
  if (length > 0) { ba.push(ubytes2bytes(word >>> 24)) }
  if (length > 1) { ba.push(ubytes2bytes((word >>> 16) & xFF)) }
  if (length > 2) { ba.push(ubytes2bytes((word >>> 8) & xFF)) }
  if (length > 3) { ba.push(ubytes2bytes(word & xFF)) }

  return ba
}

function ubytes2bytes(i) {
  if (i <= 127) { return i } else { return i - 255 }
}

// 数组元素个数必须是16的整数倍，不足的在后面补0
export function arrayTo16Array(array) {
  var distLen = parseInt((array.length - 1) / 16) * 16 + 16
  for (var i = array.length; i < distLen; i++) {
    array[i] = 0
  }
  return array
}
