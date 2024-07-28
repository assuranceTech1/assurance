import {
    createElement,
    virtualDom,
    mount,
    styleComponent,
    setStyle,
    sydDOM,
    getState,
    preState,
    useState
} from '../sydneyLib/sydneyDom.js'

setStyle([
    {
        nameTag:'mainDisplayPanel',
        style:{
            height:'fit-content',
            width:'100%',
            padding:'3px',
            display:'flex',
            justifyContent:'space-around',
            columnGap:'3px',
            flexWrap:'wrap',
            rowGap:'10px',
            padding:'20px 0',
            position:'relative'
        }
    },
    {
        nameTag:'mainPanelChild',
        style:{
            // height:'220px',
            display:'flex',
            cursor:'pointer'
        }
    }
])

sydDOM.mainDisplayPanel = () =>{
    const renderChildren = () =>{
        const renderMode = preState(['mainDisplayPanel','renderMode'],'tab');
        const resources = preState(['mainDisplayPanel','children'],[]);
        const elements = []

        for(let i = 0; i < resources.length; i++)
            {
                elements.push(
                    renderMode === 'tab' ? sydDOM.mainPanelChild_tab({index:i}) : sydDOM.mainPanelChild_capsule({index:i})
                )
            }
        return elements.length === 0 ? [createElement('h1',{style:'text-align:center;width:100%;text-transform:uppercase;'},['no search result found'])] : elements
    }
    return createElement(
        'div',
        {
            style:styleComponent.mainDisplayPanel()
        },
        [
            ...renderChildren(),
            preState(['mainDisplayPanel','children'],[]).length === 0 ? sydDOM.loader() : '',

        ],
        {
            createState:{
                stateName:'mainDisplayPanel',
                state:{childSize:2,children:[],cHover:-1,renderMode:'tab'}
            },
            type:'mainDisplayPanel'
        }
    )
}

sydDOM.mainPanelChild_capsule = ({index,route = []}) =>{
    getImg = (index) =>{
        let val = preState(['mainDisplayPanel','children'],[])[index]
        let data = '';
        if(val !== undefined)
        {
            data = val.img;
        }
        return data
    }
    return createElement(
        'div',
        {
            style:'width:100%;display:flex;column-gap:5px;padding:5px',
            class:'mainPanelChild',
        },
        [
            createElement(
                'div',
                {
                    style:`height:100%;width:30%;background-image:url("");position:relative;overflow:hidden;`+styleComponent.bg({method:'add',style:{backgroundImage:`url(assets/${getImg(index)}.jpeg)`}}),
                    // onmouseover:`panel_child_hover('${index}')`,
                    // onmouseout:`panel_child_unhover()`,
                    class:'thinBorder rated'
                },
                [
                    sydDOM.sideChildTab({index:index})
                ]
            ),
            createElement(
                'div',
                {
                    style:'height:100%;width:70%;display:flex;flex-direction:column;row-gap:10px;justify-content:space-around;padding-left:20px;padding-bottom:30px;background:linear-gradient(to left top, #1097f3,#15cbfc)',
                    class:'thinBorder'
                },
                [
                    sydDOM.mainPanelText_names_header({index:index,param:'name'}),
                    // sydDOM.mainPanelText_names({index:index,param:'cpu'}),
                    // sydDOM.mainPanelText_names({index:index,param:'ram'}),
                    // sydDOM.mainPanelText_names({index:index,param:'gen'}),
                    // sydDOM.mainPanelText_names({index:index,param:'size'}),
                    sydDOM.mainPanelText_names({index:index,param:'description'}),
                ]
            ),
            createElement(
                'div',
                {
                    style:'height:100%;width:25%;display:flex;flex-direction:column;justify-content:center;row-gap:15%;align-items:center;padding:0;width:0;',
                    class:'thinBorder'
                },
                [
                    // sydDOM.mainPanelText_price({index:index,param:'price'}),
                    // createElement('hr',{style:'width:100%'}),
                    // sydDOM.bottomSelectOption2({index:index})
                ]
            ),
        ]
    )
}

sydDOM.mainPanelChild_tab = ({index}) =>{
    panel_child_hover = (index) =>{
        const mainDisplayPanel = getState('mainDisplayPanel');
        mainDisplayPanel.cHover = index;
        useState('mainDisplayPanel',{type:'a',value:mainDisplayPanel})
    }

    panel_child_unhover = () =>{
        const mainDisplayPanel = getState('mainDisplayPanel');
        mainDisplayPanel.cHover = -1;
        useState('mainDisplayPanel',{type:'a',value:mainDisplayPanel})
    }
    const childSize = preState(['mainDisplayPanel','childSize'],2)
    return createElement(
        'div',
        {
            style:`padding:5px;height:fit-content;display:flex;flex-direction:column;row-gap:10px;width:calc((100% / ${childSize}) - ((6px + ${3 * (childSize-1)}px) / ${childSize}))`,
            // onmouseover:`panel_child_hover('${index}')`,
            // onmouseout:`panel_child_unhover()`
        },
        [
            createElement(
                'div',
                {
                    style:styleComponent.mainPanelChild({
                        method:"add",
                        style:{width:'100%',position:'relative',overflow:'hidden',backgroundImage:``}
                    })+styleComponent.bg({method:'add',style:{backgroundImage:`url(assets/${getImg(index)}.jpeg)`}}),
                    class:'mainPanelChild thinBorder rated'
                },
                [
                    sydDOM.bottomSelectOption({index:index}),
                    sydDOM.sideChildTab({index:index})
                ]
            ),
            createElement(
                'div',
                {
                    style:'min-height:50px;width:100%;display:flex;flex-direction:column;row-gap:10px;padding:10px 5px;background:#15cbfc;',
                    class:'thinBorder'
                },
                [
                    sydDOM.mainPanelText_names_header({index:index,param:'name'}),
                    // sydDOM.mainPanelText_names({index:index,param:'cpu'}),
                    // sydDOM.mainPanelText_names({index:index,param:'ram'}),
                    // sydDOM.mainPanelText_names({index:index,param:'gen'}),
                    // sydDOM.mainPanelText_names({index:index,param:'size'}),
                    sydDOM.mainPanelText_names({index:index,param:'description'}),
                    // sydDOM.mainPanelText_price({index:index,param:'price'}),
                ]
            )
        ]
    )
}

sydDOM.mainPanelText_names = ({index = -1,param = ''} = {}) =>{
    return createElement(
        'p',
        {
            style:'width:fit-content;transition:all linear .2s;font-weight:200;font-size:14px;color:#fff',
            class:'hoverText'
        },
        [
            createElement('strong',{style:'text-transform:capitalize;color:#fff'},[`${param}: `]),`${extract(index,param)}`.length === 0 ? '------------' : `${extract(index,param)} ${param === 'size' ? 'inch' : ''}` 
        ]
    )
}

sydDOM.mainPanelText_names_header = ({index = -1,param = ''} = {}) =>{
    return createElement(
        'p',
        {
            style:'width: 100%;text-align:left;transition:all linear .2s;font-size:16px;font-weight:500;text-transform:uppercase;color:#fff',
            class:'hoverText'
        },
        [
            extract(index,param)
        ]
    )
}

sydDOM.mainPanelText_price = ({index = -1,param = ''} = {}) =>{
    const refinePrice = (amount) =>{
        let newAmount = amount.split('').reverse().join('')
        let count = 0
        for(let i = 0; i < newAmount.length; i++)
        {
            if(count === 3)
            {
                newAmount = newAmount.replace(amount[i], ` ${newAmount[i]}`);
                count = 0;
            }
            count++
        }
        return amount
    }
    return createElement(
        'p',
        {
            style:'margin-top:5px;width: fit-content;font-size:15px;font-weight:700;font-family:"Plus Jakarta Sans", sans-serif;'
        },
        [
            `₦ --------`
        ]
    )
}

sydDOM.bottomSelectOption = ({index}) =>{
    addCartFunc = (index) =>{
        console.log(getTotalCart_elem())
        const floatBodyContent_cart1 = getState('floatBodyContent_cart1')
        const cart1 = getState('cart1');
        const bool = floatBodyContent_cart1.cartInfo.some(val =>{return val.id === preState(['mainDisplayPanel','children'],[])[index].id});

        switch(bool)
        {
            case false:
                switch(getTotalCart_elem() + preState(['mainDisplayPanel','children'],[])[index].price < 1000000)
                {
                    case true:
                        const pushedData = preState(['mainDisplayPanel','children'],[])[index];
                        pushedData.count = 1;
                        floatBodyContent_cart1.cartInfo.push(pushedData);
                        cart1.cartItems = floatBodyContent_cart1.cartInfo.length;
                    break;
                    default:
                        alert('Total transaction exceeded ₦1000,000')
                }
            break;
            default:
                alert('Item already added to cart')
        }
        useState('floatBodyContent_cart1',{type:'a',value:floatBodyContent_cart1})
        useState('cart1',{type:'a',value:cart1})
    }
    return createElement(
        'div',
        {
            style:`position:absolute;bottom:20px;left:50%;transform:translateX(-50%);font-size:13px;padding:10px;text-transform:capitalize;width:90%;max-width:200px;font-weight:500;min-width:fit-content;text-align:center;display:${preState(['mainDisplayPanel','cHover'],-1) === `${index}` ? 'flex' : 'none'};align-items:center;justify-content:center;column-gap:10px;opacity:.7;cursor:not-allowed;background:#333;color:#fff`,
            // class:'click mainPanelYEntrance addCartBtn',
            // onclick:`addCartFunc(${index})`
        },
        [
            'add to cart',
            createElement('i',{class:'fa-solid fa-cart-shopping',style:'pointer-events:none'})
        ]
    )
}

sydDOM.bottomSelectOption2 = ({index}) =>{
    return createElement(
        'div',
        {
            style:`font-size:13px;font-weight:500;padding:10px;text-transform:capitalize;width:80%;min-width:fit-content;text-align:center;display:flex;column-gap:10px;justify-content:center;opacity:.7;cursor:not-allowed;background:#333;color:#fff`,
            // class:'click addCartBtn ',
            // onclick:`addCartFunc(${index})`
        },
        [
            'add to cart',
            createElement('i',{class:'fa-solid fa-cart-shopping',style:'pointer-events:none'})
        ]
    )
}

sydDOM.sideChildTab = ({index}) =>{
    return createElement(
        'div',
        {
            style:`position:absolute;right:10px;padding:5px;top:20px;display:${preState(['mainDisplayPanel','cHover'],-1) === `${index}` ? 'block' : 'none'};opacity:1;`,
            class:'mainPanelXEntrance'
        },
        [
            sydDOM.sideChildTab_child({content:"fa-solid fa-magnifying-glass-plus",click:'inspect',index:index}),
            sydDOM.sideChildTab_child({content:"fa-solid fa-chart-simple"}),
            sydDOM.sideChildTab_child({content:"fa-regular fa-heart"})
        ]
    )
}

sydDOM.sideChildTab_child = ({content,click = undefined,index = -1}) =>{
    inspect = (index) =>{
        const quickView = getState('quickView');
        quickView.d = 'flex';
        quickView.current = index;
        useState('quickView',{type:'a',value:quickView});
        virtualDom['quickViewMain'].focus()
    }
    return createElement(
        'div',
        {
            style:styleComponent.menuBox({method:"add",style:{opacity:content === "fa-solid fa-chart-simple" || content === "fa-regular fa-heart" ? ".7" : '1',pointerEvents:content === "fa-solid fa-chart-simple" || content === "fa-regular fa-heart" ? "none" : 'auto'}}) + 'margin-bottom:7px',
            class:'click',
            onclick:click == undefined ? '' : `${click}(${index})`
        },
        [
            createElement('i',{class:content})
        ]
    )
}