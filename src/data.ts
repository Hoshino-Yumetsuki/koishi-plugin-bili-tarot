import path from 'path';
import fs from 'node:fs/promises';

// 导入 JSON 文件
import tarotNames from './name.json';
import upTexts from './upText.json';
import reversedTexts from './reversedText.json';
import tarotImgs from './picUrl.json';

export interface ITarot {
  /** 可选牌面 Buffer */
  picBuffers: Buffer[];
  /** 正位描述文案 */
  upText: string;
  /** 逆位描述文案 */
  reversedText: string;
  /** 卡牌名称 */
  name: string;
}

let cachedTarotData: ITarot[] | null = null;

export async function getTarotData(): Promise<ITarot[]> {
  if (cachedTarotData) return cachedTarotData;

  const tarotData = await Promise.all(
    (Object.keys(tarotNames) as Array<keyof typeof tarotNames>).map(async (key) => ({
      picBuffers: await Promise.all(tarotImgs[key].map((image) =>
        fs.readFile(path.join(__dirname, image))
      )),
      upText: upTexts[key],
      reversedText: reversedTexts[key],
      name: tarotNames[key],
    }))
  );

  cachedTarotData = tarotData;
  return tarotData;
}
