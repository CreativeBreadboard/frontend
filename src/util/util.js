export function getListData(data) {
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

    for(key in components.Resistor) {
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