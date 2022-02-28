function uuid(length, radix) {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    radix = radix || chars.length;
    const uuid = [];
    if (length) {
        // 紧凑型实现，没有中横线
        for (let i = 0; i < length; i++) {
            uuid[i] = chars[Math.floor(Math.random() * radix)];
        }
    }
    else {
        // rfc4122,版本4实现
        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';
        // 填写随机数据，在i===19处，按照rfc4122，设置时钟序列的高位(89ab四个字符随机)
        for (let i = 0; i < 36; i++) {
            if (!uuid[i]) {
                const r = Math.floor(Math.random() * 16);
                uuid[i] = chars[(i === 19) ? (r & 0x3) | 0x8 : r];
            }
        }
    }
    return uuid.join('');
}
export default uuid;
//# sourceMappingURL=index.js.map