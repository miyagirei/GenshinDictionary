import fs from "fs";

const json = JSON.parse(fs.readFileSync("src/data.json", "utf-8"));

const tsContent = `
export type Character = {
    id: number;
    name : string;
    reading : string;
    element: "炎" | "水" | "雷" | "氷" | "岩" | "風" | "草";
    weapon: "片手剣" | "両手剣" | "槍" | "弓" | "法器";
    region:"モンド" | "璃月" | "稲妻" | "スメール" | "フォンテーヌ" | "ナタ" | "ナド・クライ" | "その他";
    ascensionStat: "HP" | "攻撃力" | "防御力" | "元素熟知" | "会心率" | "会心ダメージ" | "与える治療効果" | "元素チャージ効率" | 
    "炎元素ダメージ" | "水元素ダメージ" | "草元素ダメージ" | "雷元素ダメージ" | "風元素ダメージ" | "氷元素ダメージ" | "岩元素ダメージ" | "物理ダメージ"; 
    energyCost: "40族" | "50族" |"60族" |"70族" |"80族" |"90族";
    abilities: string[];
    image: string;
};

export const characters: Character[] = ${JSON.stringify(json,null,2)};
`;

fs.writeFileSync("src/data.ts", tsContent, "utf-8");
console.log("data.tsを更新しました！");