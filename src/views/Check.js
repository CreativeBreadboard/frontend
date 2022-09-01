import { useState } from 'react';
import Annotation from 'react-image-annotation'
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import Simple from '../components/Simple';
import Title from '../components/Title';
import TitleBorder from '../components/TitleBorder';

function Edit(props) {
    var values = props.data[props.edit_index];
    console.log(values);

    var [name, setName] = useState(values.name);
    var [type, setType] = useState(values.type);
    var [start_pin, setStartPin] = useState(values.start_pin);
    var [end_pin, setEndPin] = useState(values.end_pin);
    var [reg, setReg] = useState(values.reg);

    return (
        <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <Title title="수정" description="해당 컴포넌트의 정보를 수정해주세요. "/>

            <TitleBorder title="정보" />

            <Input title="이름" type="text" value={name} setValue={setName}/>
            <Input title="종류" type="text" value={type} setValue={setType}/>
            <Input title="시작핀" type="text" value={start_pin} setValue={setStartPin}/>
            <Input title="끝핀" type="text" value={end_pin} setValue={setEndPin}/>
            <Input title="저항값" type="number" value={reg === -1 ? 0 : reg} disabled={reg === -1} setValue={setReg}/>

            <Button text="삭제" onClick={x => props.setContents("check")}/>
            <Button text="확인" onClick={x => {
                values = props.data;
                values[props.edit_index].name = name;
                values[props.edit_index].type = type;
                values[props.edit_index].start_pin = start_pin;
                values[props.edit_index].end_pin = end_pin;
                values[props.edit_index].reg = reg;

                props.func_setData(values);
                props.setIsEdit(false);
            }}/>
        </div>
    )
}

function List(props) {
    return (
        <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <Title title="컴포넌트" description="검출된 컴포넌트이에요. 확인해주세요. "/>

            <table class="table p-2 bg-white rounded-lg w-full">
                <thead>
                    <tr>
                        <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                            이름
                        </th>
                        <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                            종류
                        </th>
                        <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                            시작핀
                        </th>
                        <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                            끝핀
                        </th>
                        <th class="border-b-2 p-4 dark:border-dark-5 whitespace-nowrap font-normal text-gray-900">
                            저항값
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((val, index) => {
                        return (
                            <tr class="text-gray-700 " onClick={x => {props.func_setEditIndex(index); props.setIsEdit(true);}}>
                                <td class="border-b-2 p-4 dark:border-dark-5">{val.name}</td>
                                <td class="border-b-2 p-4 dark:border-dark-5">{val.type}</td>
                                <td class="border-b-2 p-4 dark:border-dark-5">{val.start_pin}</td>
                                <td class="border-b-2 p-4 dark:border-dark-5">{val.end_pin}</td>
                                <td class="border-b-2 p-4 dark:border-dark-5">{val.reg === -1 ? "-" : val.reg}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            <Button text="다음" onClick={x => props.setContents("result")}/>
        </div>
    )
}

function getListData(data) {
    const components = data.components;
    var [width, height] = data.basePoint[2];
    width += 200;
    height += 200;

    var list_data = [];
    var list_annotation = [];

    for(var key in components.Line) {
        list_data.push({
            "name": components.Line[key].name, 
            "type": "Line", 
            "start_pin": components.Line[key].start, 
            "end_pin": components.Line[key].end, 
            "reg": -1}
        );

        list_annotation.push({
            "data": {"text": components.Line[key].name, "id": Math.random()},
            "geometry": {
                "type": "RECTANGLE",

                "x": components.Line[key].areaStart[0] / width * 100,
                "y": components.Line[key].areaStart[1] / height * 100,

                "width": (components.Line[key].areaEnd[0] - components.Line[key].areaStart[0]) / width * 100,
                "height": (components.Line[key].areaEnd[1] - components.Line[key].areaStart[1]) / height * 100
            }
        });
    }

    for(var key in components.Resistor) {
        list_data.push({
            "name": components.Resistor[key].name, 
            "type": "Resistor", 
            "start_pin": components.Resistor[key].start, 
            "end_pin": components.Resistor[key].end, 
            "reg": components.Resistor[key].value
        });

        list_annotation.push({
            "data": {"text": components.Resistor[key].name, "id": Math.random()},
            "geometry": {
                "type": "RECTANGLE",

                "x": components.Resistor[key].areaStart[0] / width * 100,
                "y": components.Resistor[key].areaStart[1] / height * 100,

                "width": (components.Resistor[key].areaEnd[0] - components.Resistor[key].areaStart[0]) / width * 100,
                "height": (components.Resistor[key].areaEnd[1] - components.Resistor[key].areaStart[1]) / height * 100
            }
        });
    }

    console.log(list_data, list_annotation);

    return [list_data, list_annotation];
}

export function Check(props) {
    console.log(props.resultData);
    const [result_data, result_anno] = getListData(props.resultData);
    console.log(result_data, result_anno);

    var [markers, setMarkers] = useState(result_anno);
    var [circuit_img, setCircuitImage] = useState("data:image/jpg;base64, " + props.resultData.transformedImg);
    var [isEdit, setIsEdit] = useState(false);
    var [data, setData] = useState(result_data);
    var [edit_index, setEditIndex] = useState(-1);
    var [annos, setAnnotations] = useState(result_anno);

    return (
        <div class="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl m-5 w-full">
            <div class="hidden bg-cover lg:block lg:w-1/2">
                <Simple src_image={circuit_img} markers={markers}/>
            </div>
            {!isEdit && <List setIsEdit={setIsEdit} data={data} func_setEditIndex={setEditIndex} setContents={props.setContents}></List>}
            {isEdit && <Edit setIsEdit={setIsEdit} data={data} edit_index={edit_index} func_setData={setData}></Edit>}
        </div>
    );
}