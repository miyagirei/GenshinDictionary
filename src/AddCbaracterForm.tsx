import React,{useState} from "react";
import { elements, weapons, regions, ascensionStats, abilityOptions, energyCosts } from "./constants";

type CharacterInput = {
    id: number;
    name : string;
    reading : string;
    element: string;
    weapon: string;
    region:string;
    ascensionStat: string; 
    energyCost: string;
    abilities: string[];
    image: string;
}

const AddCharacterFrom: React.FC = () => {
    const [char, setChar] = useState<CharacterInput>({
        id: Date.now(),
        name: "",
        reading : "",
        element: "",
        weapon: "",
        region:"",
        ascensionStat: "", 
        energyCost: "", 
        abilities: [],
        image: "",
    });


    // const [abilityInput, setAbilityInput] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name , value} = e.target;
        
        setChar({...char, [name]: value});
        
    };

    // const addAbility = () => {
    //     if(abilityInput.trim() != ""){
    //         setChar({...char, abilities: [...char.abilities, abilityInput.trim()]});
    //         setAbilityInput("");
    //     }
    // };

    const copyJSON = () => {
        const charCopy = {
            ...char,
            image: char.image ? `/images/${char.image}` : "",
        };
        const jsonStr = JSON.stringify(charCopy, null,2);
        navigator.clipboard.writeText(jsonStr);
        alert("JSONをクリップボードにコピーしました!");
    };

    return(
        <div style={{border: "1px solid #ccc",padding: "16px",marginBottom: "24px"}}>
            <h2>新しいキャラクターを追加</h2>

            <label>
                名前:
                <input type="text" name="name" value={char.name} onChange={handleChange}/>
            </label>
            <br />

            <label>
                ふりがな:
                <input type="text" name="reading" value={char.reading} onChange={handleChange}/>
            </label>
            <br />

            <label>
                元素:
                <select name="element" value={char.element} onChange={handleChange}>
                    <option value="">選択してください</option>
                    {elements.map((el) => (
                        <option key={el} value={el}>{el}</option>
                    ))}
                </select>
            </label>
            <br />

            <label>
                武器種:
                <select name="weapon" value={char.weapon} onChange={handleChange}>
                    <option value="">選択してください</option>
                    {weapons.map((w) => (
                        <option key={w} value={w}>{w}</option>
                    ))}
                </select>
            </label>
            <br />

            <label>
                地域:
                <select name="region" value={char.region} onChange={handleChange}>
                    <option value="">選択してください</option>
                    {regions.map((r) => (
                        <option key={r} value={r}>{r}</option>
                    ))}
                </select>
            </label>
            <br />

             <label>
                突破ステータス:
                <select name="ascensionStat" value={char.ascensionStat} onChange={handleChange}>
                    <option value="">選択してください</option>
                    {ascensionStats.map((a) => (
                        <option key={a} value={a}>{a}</option>
                    ))}
                </select>
            </label>
            <br />

             <label>
                必要元素エネルギー:
                <select name="energyCost" value={char.energyCost} onChange={handleChange}>
                    <option value="">選択してください</option>
                    {energyCosts.map((a) => (
                        <option key={a} value={a}>{a}</option>
                    ))}
                </select>
            </label>
            <br />

             <label>
                画像URL:
                <input type="text" name="image" value={char.image} onChange={handleChange}/>
            </label>
            <br />

            <label>
                特性:
                {abilityOptions.map((ability) => (
                    <label key={ability} style={{marginRight: "10px"}}>
                        <input
                        type="checkbox"
                        value={ability}
                        checked={char.abilities.includes(ability)}
                        onChange={(e) => {
                            const checked = e.target.checked;
                            if (checked) {
                                setChar({ ...char, abilities: [...char.abilities, ability] });
                            } else {
                                setChar({ ...char, abilities: char.abilities.filter(a => a !== ability) });
                            }
                        }}
                    />
                    {ability}
                    </label>
                ))}
                
            </label>
            <div>追加済み能力: {char.abilities.join(" / ")}</div>
            
            <br />
            <button type="button" onClick={copyJSON}>
                JSONとしてコピー
            </button>
        </div>
    );
};

export default AddCharacterFrom;