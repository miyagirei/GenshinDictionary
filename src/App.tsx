import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
import { characters } from "./data";
import type { Character } from "./data";
import AddCharacterFrom from './AddCbaracterForm';
import { abilityOptions, weaponOptions } from "./constants";

function App() {
  const [selectedRarity, setSelectedRarity] = useState<string>("全て");
  const [selectedElement, setSelectedElement] = useState<string>("全て");
  const [selectedWeapon, setSelectedWeapon] = useState<string>("全て");
  const [selectedRegion, setSelectedRegion] = useState<string>("全て");
  const [selectedAscensionStat, setSelectedAscensionStat] = useState<string>("全て");
  const [selectedEnergyCost, setSelectedEnergyCost] = useState<string>("全て");
  const [selectedAbilities, setSelectedAbilities] = useState<string[]>([]);
  
  const [sortByReading, setSortReading] = useState(false);
  
  const toggleAbility = (ability:string) =>{
    setSelectedAbilities((prev) =>
      prev.includes(ability)
        ? prev.filter((a) => a !== ability)
        :[...prev, ability]
    );
  };

  //フィルター
  const filteredCharacter = characters.filter((c: Character)=>{
    const rarityMatch = selectedRarity === "全て" || c.rarity === selectedRarity;
    const elementMatch = selectedElement === "全て" || c.element === selectedElement;
    const weaponMatch = selectedWeapon === "全て" || c.weapon === selectedWeapon;
    const regionMatch = selectedRegion === "全て" || c.region === selectedRegion;
    const ascensionStatMatch = selectedAscensionStat === "全て" || c.ascensionStat === selectedAscensionStat;
    const energyCostMatch = selectedEnergyCost === "全て" || c.energyCost === selectedEnergyCost;
    const abilityMatch = 
    selectedAbilities.length === 0 ||
    selectedAbilities.every((a) => c.abilities.includes(a));
    
    return rarityMatch && elementMatch && weaponMatch && regionMatch && ascensionStatMatch && energyCostMatch &&abilityMatch;
  });
  
  const displayedCharacters = [...filteredCharacter];

  if(sortByReading){
    displayedCharacters.sort((a,b) =>
      a.reading.localeCompare(b.reading, "ja")
    );
  }

  return (


    <div style={{padding: "20px"}}>
      <h1>キャラクター図鑑</h1>

    {/* フィルター用セレクトボックス */}
          <div>
        <label>レアリティで絞り込み</label>
        <select
        value={selectedRarity}
        onChange={(e) => setSelectedRarity(e.target.value)}
        >
          <option value={"全て"}>全て</option>
          <option value={"星5"}>星5</option>
          <option value={"星4"}>星4</option>
        </select>
      </div>

      <div>
        <label>元素で絞り込み</label>
        <select
        value={selectedElement}
        onChange={(e) => setSelectedElement(e.target.value)}
        >
          <option value={"全て"}>全て</option>
          <option value={"炎"}>炎</option>
          <option value={"水"}>水</option>
          <option value={"雷"}>雷</option>
          <option value={"氷"}>氷</option>
          <option value={"岩"}>岩</option>
          <option value={"風"}>風</option>
          <option value={"草"}>草</option>
        </select>
      </div>

      <div style={{display:"flex",justifyContent:"center",gap:"8px"}}>
        <label>武器種で絞り込み</label>
        <div style={{display:"flex",justifyContent:"center",gap:"8px"}}>

        <select
        value={selectedWeapon}
        onChange={(e) => setSelectedWeapon(e.target.value)}
        >
          <option value={"全て"}>全て</option>
          {Object.keys(weaponOptions).map((weapon) =>(
            <option key={weapon} value={weapon}>
              {weapon}
            </option>
          ))}
        </select>
        
        <div
        style={{
          width:24,
          height:24,
          backgroundColor:selectedWeapon === "全て" ? "transparent" : "#000",
          borderRadius: "50%",
          padding: "1px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
        >
        {selectedWeapon !== "全て" && (
          <img
            src={weaponOptions[selectedWeapon]}
            alt={`${selectedWeapon}アイコン`}
            width={24}
            height={24}
            style={{
              backgroundColor:"#000000",
              borderRadius:"50%",
              padding:"1px"
            }}
          />
        )}
        </div>
        </div>
      </div>

      <div>
        <label>地域で絞り込み</label>
        <select
        value={selectedRegion}
        onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value={"全て"}>全て</option>
          <option value={"モンド"}>モンド</option>
          <option value={"璃月"}>璃月</option>
          <option value={"稲妻"}>稲妻</option>
          <option value={"スメール"}>スメール</option>
          <option value={"フォンテーヌ"}>フォンテーヌ</option>
          <option value={"ナタ"}>ナタ</option>
          <option value={"ナド・クライ"}>ナド・クライ</option>
          <option value={"その他"}>その他</option>
        </select>
      </div>

      <div>
        <label>突破ステータスで絞り込み</label>
        <select
        value={selectedAscensionStat}
        onChange={(e) => setSelectedAscensionStat(e.target.value)}
        >
          <option value={"全て"}>全て</option>
          <option value={"HP"}>HP</option>
          <option value={"攻撃力"}>攻撃力</option>
          <option value={"防御力"}>防御力</option>
          <option value={"元素熟知"}>元素熟知</option>
          <option value={"会心率"}>会心率</option>
          <option value={"会心ダメージ"}>会心ダメージ</option>
          <option value={"与える治療効果"}>与える治療効果</option>
          <option value={"元素チャージ効率"}>元素チャージ効率</option>
          <option value={"炎元素ダメージ"}>炎元素ダメージ</option>
          <option value={"水元素ダメージ"}>水元素ダメージ</option>
          <option value={"草元素ダメージ"}>草元素ダメージ</option>
          <option value={"雷元素ダメージ"}>雷元素ダメージ</option>
          <option value={"風元素ダメージ"}>風元素ダメージ</option>
          <option value={"氷元素ダメージ"}>氷元素ダメージ</option>
          <option value={"岩元素ダメージ"}>岩元素ダメージ</option>
          <option value={"物理ダメージ"}>物理ダメージ</option>
        </select>
      </div>

      <div>
        <label>必要元素エネルギーで絞り込み</label>
        <select
        value={selectedEnergyCost}
        onChange={(e) => setSelectedEnergyCost(e.target.value)}
        >
          <option value={"全て"}>全て</option>
          <option value={"40族"}>40族</option>
          <option value={"50族"}>50族</option>
          <option value={"60族"}>60族</option>
          <option value={"70族"}>70族</option>
          <option value={"80族"}>80族</option>
          <option value={"90族"}>90族</option>
        </select>
      </div>

      <div>
        <label>特性で絞り込み: </label>
        <div className="ability-style">
          {abilityOptions.map((ability,index) =>(
            <label key={ability} style={{marginRight: "10px"}}>
              <span key={index} className="ability-tag">
                <input
                type="checkbox"
                checked={selectedAbilities.includes(ability)}
                onChange={() => toggleAbility(ability)}
                />
                {ability}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* キャラクター一覧 */}
      <div>
        <button onClick={() => setSortReading(!sortByReading)}>
          {sortByReading ? "通常の順番に戻す" : "名前順にソート"}
        </button>

      <div
      style={{
        display: "grid",
        gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",
        gap: "20px"
      }}
      >
        {displayedCharacters.map((char: Character) => (
          <div
          key = {char.id}
          style={{
            border: "1px splid #ccc",
            borderRadius: "8px",
            padding: "10px",
            textAlign: "center"
          }}
        >
          <img
          src={char.image}
          alt={char.name}
          style={{width:"100%", borderRadius:"8px"}}
          />
          <h3>{char.name}</h3>

          <ul style={{margin:0,padding:0,listStyle:"none",lineHeight:"1.2"}}>
            <li>元素: {char.element}</li>
            <li>武器種: {char.weapon}</li>
            <li>地域: {char.region}</li>
            <li>突破ステータス: {char.ascensionStat}</li>
            <li>必要元素エネルギー: {char.energyCost}</li>
            <li>特性:
              <div className="ability-style">
                {char.abilities
                .slice()
                .sort(
                  (a,b) => abilityOptions.indexOf(a) - abilityOptions.indexOf(b)
                )
                .map((ability,index) =>(
                  <span key={index} className="ability-tag">
                    {ability}
                  </span>
                ))}
              </div>
            </li>
          </ul>

          </div>
        ))}
        </div>
        </div>

        <div>
          <label>Form</label>
          <AddCharacterFrom />
        </div>
      </div>
      
  );
}

export default App
