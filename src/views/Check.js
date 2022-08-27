import { useState } from 'react';
import Annotation from 'react-image-annotation'
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import Simple from '../components/Simple';

function Edit(props) {
    const values = props.data[props.edit_index];
    console.log(values);

    return (
        <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-white">수정</h2>
            <p class="text-xl text-center text-gray-600 dark:text-gray-200">해당 컴포넌트의 정보를 수정해주세요. </p>

            <div class="flex items-center justify-between mt-4">
                <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                <a href="/" class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">정보</a>

                <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
            </div>

            <Input title="이름" type="text" value={values.name}/>
            <Input title="종류" type="text" value={values.type}/>
            <Input title="시작핀" type="text" value={values.start_pin}/>
            <Input title="끝핀" type="text" value={values.end_pin}/>
            <Input title="저항값" type="number" value={values.reg === -1 ? 0 : values.reg} disabled={values.reg === -1}/>

            <Button text="삭제" onClick={x => props.setContents("check")}/>
            <Button text="확인" onClick={x => props.setIsEdit(false)}/>
        </div>
    )
}

function List(props) {

    return (
        <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
            <h2 class="text-2xl font-semibold text-center text-gray-700 dark:text-white">컴포넌트</h2>
            <p class="text-xl text-center text-gray-600 dark:text-gray-200">검출된 컴포넌트이에요. 확인해주세요. </p>

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

            <Button text="다음" onClick={x => props.setContents("check")}/>
        </div>
    )
}

export function Check(props) {
    var [markers, setMarkers] = useState([]);
    var [url_image, setImageURL] = useState("https://via.placeholder.com/330x600");
    var [isEdit, setIsEdit] = useState(false);
    var [data, setData] = useState([{"name": "L1", "type": "Line", "start_pin": "A2", "end_pin": "A4", "reg": -1},
                                    {"name": "R1", "type": "Register", "start_pin": "B2", "end_pin": "B4", "reg": 320},]);
    var [edit_index, setEditIndex] = useState(-1);
    var [annos, setAnnotations] = useState([])

    return (
        <div class="flex max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl m-5 w-full">
            <div class="hidden bg-cover lg:block lg:w-1/2">
                <Simple></Simple>
            </div>
            {!isEdit && <List setIsEdit={setIsEdit} data={data} func_setEditIndex={setEditIndex}></List>}
            {isEdit && <Edit setIsEdit={setIsEdit} data={data} edit_index={edit_index} func_setData={setData}></Edit>}
        </div>

    );
}