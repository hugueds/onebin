const array = [
    1792544,
    2287886,
    2507448,
    1360401,
    2052426,
    1448883,
    1357950,
    1778889,
    1792544,
    2287886,
    2507448
]

const objArr = [
    {
        order: 0,
        partNumber: 1,
        quantity: 10
    },
    {
        order: 0,
        partNumber: 2,
        quantity: 10
    },
    {
        order: 0,
        partNumber: 3,
        quantity: 10
    },
    {
        order: 1,
        partNumber: 3,
        quantity: 10
    },
    {
        order: 1,
        partNumber: 2,
        quantity: 10
    },
    {
        order: 0,
        partNumber: 7,
        quantity: 10
    },
    {
        order: 0,
        partNumber: 8,
        quantity: 10
    },
    {
        order: 0,
        partNumber: 9,
        quantity: 10
    }
]


objArr.map((o,i) => {

    if (array.find(a => a === o.partNumber)){
        let index = array.indexOf(o.partNumber)
        console.log(index);
        array.splice(index, 1)
    }

    return o;

});
