import {
    createElement,
    virtualDom,
    mount,
    styleComponent,
    setStyle,
    sydDOM,
    getState,
    preState,
    useState,
    visualTree
} from './sydneyLib/sydneyDom.js'

import './navComponentNonSticky.js'
import './navComponentSticky.js'
import './bodyContent/bodyContent.js'
import './newsletter/newsletter.js'
import './contactInfoPage/contactInfoPage.js'
import './quickView/quickView.js'
import './loader/loader-c.js'

import {product} from './products.js';


setStyle([
    {
        nameTag:'container',
        style:{
            height:'100vh',
            width:'100vw',
            display:'flex',
            flexDirection:'column',
            alignItems:'center',
            background:'#fff',
            padding:'0 2px',
            position:'relative',
            // fontFamily:'ubuntu',
            fontFamily:'"Poppins", sans-serif',
            overflowX:'hidden',
            // color:'#1097f3'
        }
    },
    {
        nameTag:'flexType',
        style:{
            display:'flex',
            justifyContent:'flex-start',
            alignItems:'center'
        }
    },
    {
        nameTag:'bg',
        style:{
            backgroundPosition:'center',
            backgroundSize:'contain',
            backgroundRepeat:'no-repeat'
        }
    }
])

extract = (index,param) =>{
    const parent = preState(['mainDisplayPanel','children'],[])[index];
    let text = ''
    switch(true)
    {
        case parent !== undefined:
            text = parent[param]
    }
    return text
}

extractImageId = (text) =>{
    const reg = /\d{1,}/.exec(text);
    let returnable = '00'
    switch(true)
    {
        case reg !== null:
            returnable = reg[0]
    }
    return `ITEM${returnable.split('').reverse().join('')}`
}

getTotalCart_elem = () =>{
    const floatBodyContent_cart1_el = preState(['floatBodyContent_cart1','cartInfo'],[]);
    let subTotal = 0
    for(let i = 0; i < floatBodyContent_cart1_el.length; i++)
    {
        subTotal += floatBodyContent_cart1_el[i].price * Number(floatBodyContent_cart1_el[i].count);
    }
    return subTotal
}

getcartInfo = (index,param) =>{
    const data = preState(['floatBodyContent_cart1','cartInfo'],[])[index];
    let text = '';
    switch(true)
    {
        case data !== undefined:
            text = data[param]
    }
    return `${text}`
}

sydDOM.container = () =>{
    return createElement(
        'div',
        {
            style:styleComponent.container({method:'add',style:{overflowY:preState(['container','ov'],'scroll')}})
        },
        [
            sydDOM.topNonStickyContactNav(),
            sydDOM.topStickyNav(),
            // sydDOM.bodySideNav(),
            sydDOM.mainBodyContent(),
            sydDOM.newsLetter(),
            sydDOM.contactInfoPage(),
            sydDOM.quickView(),
            sydDOM.decForm(),
            sydDOM.contactMessage(),
        ],
        {
            createState:{
                stateName:'container',
                state:{colors:{
                    shadow:'grey'
                },ov:'scroll'}
            },
            type:'container'
        }
    )
}

sydDOM.contactMessage = () =>{
    togContactTabs = () =>{
        const contactMessage = getState('contactMessage');
        
        contactMessage.current = contactMessage.current === 0 ? 1 : 0

        useState('contactMessage', {type:"a",value:contactMessage})
    }
    return createElement(
        'div',
        {
            style:'height:fit-content;width:200px;position:sticky;right:20px;bottom:70px;display:flex;justify-content:center;column-gap:8px;align-items:center;padding:0 10px;z-index:900;align-self:flex-end',
            class:'contactMessage'
        },
        [
            createElement(
                'div',
                {
                    style:'height:fit-content;position:relative;width:100%;',
                },
                [
                    sydDOM.contactText(),
                    sydDOM.contactIcons()
                ]
            ),
            createElement('div',{style:`transition:all .3s linear;transform:rotateZ(${preState(['contactMessage','current'],0) * -360}deg);height:50px;width:50px;min-height:50px;min-width:50px;border-radius:50%;background:#1097f3;cursor:pointer;z-index:100;`+styleComponent.bg({method:'add',style:{backgroundImage:preState(['contactMessage','current'],0) === 0 ? `url(assets/chat.png)` : `url(assets/exit.png)`,backgroundSize:'80%'}}),onclick:'togContactTabs()'})
        ],{
            createState:{
                stateName:'contactMessage',
                state:{current:0}
            },
            type:'contactMessage'
        }
    )
}

sydDOM.contactText = () =>{
    return createElement(
        'p',
        {
            style:`font-weight:700;text-transform:capitalize;background:#fff;box-shadow:0 0 5px #333;border-radius:10px;cursor:pointer;display:${preState(['contactMessage','current'],0) === 0 ? 'flex' : 'none'}`,
            class:'animateEntrance_opacity spook'
        },
        [createElement('p',{style:'padding:10px;height:100%;width:100%;background:#15cbfc;border-radius:inherit;z-index:200;color:#fff'},['contact us'])],
        {
            createState:{
                stateName:'contactText',
                state:{d:'block'}
            },
            type:'contactText'
        }
    )
}
// console.log(location.href)

sydDOM.contactIcons = () =>{
    return createElement(
        'div',
        {
            style:'height:fit-content;width:100%;background:unset;position:absolute;top:50%;z-index:100;'+styleComponent.flexType({method:'add',style:{justifyContent:'center',columnGap:'5px',display:`${preState(['contactMessage','current'],0) === 1 ? 'flex' : 'none'}`}}),
            class:'animateEntrance'
        },
        [
            createElement('div',{style:styleComponent.menuBox({method:'add',style:{height:'40px',width:'40px',animationDuration:'.8s'}}) + styleComponent.bg({method:'add',style:{backgroundImage:`url("assets/phone.png")`}}),class:'mainPanelXEntrance'}),
            createElement('div',{style:styleComponent.menuBox({method:'add',style:{height:'40px',width:'40px'}})  + styleComponent.bg({method:'add',style:{backgroundImage:`url("assets/whatsapp.png")`}}),class:''}),
        ]
    )
}

sydDOM.decForm = () =>{
    return createElement(
        'form',
        {
            style:'position:absolute;top:-300px;pointer-events: none;height:0;width:0;cursor:pointer',
            action:`${preState(['decForm','req'],'')}`,
            method:"POST"
        },
        [
            createElement('input',{name:'cartInfo',value:preState(['decForm','cartInfo'],'0000 ? 0000')}),
            createElement('input',{name:'webMode',value:preState(['decForm','webMode'],'')})
        ],
        {
            createState:{
                stateName:'decForm',
                state:{req:'',cartInfo:'0000 ? 0000',webMode:''}
            },
            type:'decForm'
        }
    )
}

mount(sydDOM.container())


function renderIntoDisplayPanel()
{
    const mainDisplayPanel = getState('mainDisplayPanel')
    mainDisplayPanel.children = product;
    useState('mainDisplayPanel',{type:'a',value:mainDisplayPanel})
}

renderIntoDisplayPanel()



addEventListener('resize', e =>{
    setMediaQuery450();
    setMediaQuery750();
    setMediaQuery700();
    setMediaQuery1000();
    setMediaQuery1200();
   
})
addEventListener('load', () =>{
    setMediaQuery450();
    setMediaQuery750();
    setMediaQuery700();
    setMediaQuery1000();
    setMediaQuery1200();
})
function setMediaQuery750(){
    const searchTab1 = getState('searchTab1');
    const menuBtn1 = getState('menuBtn1');
    const likeHeart1 = getState('likeHeart1');
    const wrapAcc_cart = getState('wrapAcc_cart');
    const mobileMenuSearch = getState('mobileMenuSearch');
    const floatBodyContent = getState('floatBodyContent');
    const topStickyNav = getState('topStickyNav');
    const resizeMainTabDiv = getState('resizeMainTabDiv');
    const mainDisplayPanel = getState('mainDisplayPanel');
    switch(true)
    {
        case Number(window.innerWidth) <= 750:
            searchTab1.d = 'none';
            menuBtn1.d = 'none';
            likeHeart1.d = 'none';
            wrapAcc_cart.f = 'unset';
            mobileMenuSearch.d = 'flex';
            topStickyNav.jC = 'space-around';
            switch(true)
            {
                case !resizeMainTabDiv.nonDisplay.includes('3'):
                    resizeMainTabDiv.nonDisplay.push('3')
            }
            mainDisplayPanel.childSize = 2;
        break;
        default:
            floatBodyContent.d = 'none';
            floatBodyContent.o = '0';
            floatBodyContent.controller = ''
            searchTab1.d = 'flex'
            menuBtn1.d = 'flex'
            likeHeart1.d = 'flex'
            wrapAcc_cart.f = '2 / 5'
            mobileMenuSearch.d = 'none';
            topStickyNav.jC = 'space-between',
            // resizeMainTabDiv.d = 'flex'
            mainDisplayPanel.childSize = 3;
            resizeMainTabDiv.currentClick = '3'
            let id = resizeMainTabDiv.nonDisplay.indexOf('3');
            switch(true)
            {
                case resizeMainTabDiv.nonDisplay.includes('3'):
                    resizeMainTabDiv.nonDisplay.splice(id,1)
            }
    }
    useState('searchTab1', {type:'a', value:searchTab1})
    useState('menuBtn1', {type:'a', value:menuBtn1})
    useState('likeHeart1', {type:'a', value:likeHeart1})
    useState('wrapAcc_cart', {type:'a',value:wrapAcc_cart})
    useState('mobileMenuSearch',{type:'a',value:mobileMenuSearch});
    useState('floatBodyContent', {type:'a', value:floatBodyContent})
    useState('topStickyNav', {type:'a',value:topStickyNav})
    useState('resizeMainTabDiv',{type:'a',value:resizeMainTabDiv})
    useState('mainDisplayPanel',{type:'a',value:mainDisplayPanel})
}

function setMediaQuery1200()
{
    const menuBtn1 = getState('menuBtn1');
    const extraLargeTabMenu = getState('extraLargeTabMenu');
    switch(true)
    {
        case Number(window.innerWidth) >= 1200:
            menuBtn1.d = 'none';
            extraLargeTabMenu.d = 'flex';
        break;
        default:
            extraLargeTabMenu.d = 'none'
    }
    useState('menuBtn1', {type:'a', value:menuBtn1})
    useState('extraLargeTabMenu',{type:'a',value:extraLargeTabMenu})
}

function setMediaQuery700()
{
    const mainDisplayPanel = getState('mainDisplayPanel');
    const resizeMainTabDiv = getState('resizeMainTabDiv')
    switch(true)
    {
        case Number(window.innerWidth) < 700:
            mainDisplayPanel.renderMode = 'tab';
            switch(true)
            {
                case !resizeMainTabDiv.nonDisplay.includes('0'):
                    resizeMainTabDiv.nonDisplay.push('0')
            }
        break;
        default:
            let id = resizeMainTabDiv.nonDisplay.indexOf('0');
            switch(true)
            {
                case resizeMainTabDiv.nonDisplay.includes('0'):
                    resizeMainTabDiv.nonDisplay.splice(id,1)
            }
    }
    useState('mainDisplayPanel',{type:'a',value:mainDisplayPanel});
    useState('resizeMainTabDiv',{type:'a',value:resizeMainTabDiv})
}

function setMediaQuery450()
{
    const mainDisplayPanel = getState('mainDisplayPanel')
    const resizeMainTabDiv = getState('resizeMainTabDiv')
    switch(true)
    {
        case Number(window.innerWidth) < 450:
            mainDisplayPanel.childSize = 2;
            resizeMainTabDiv.currentClick = '2'
            let id = resizeMainTabDiv.nonDisplay.indexOf('2');
            switch(true)
            {
                case resizeMainTabDiv.nonDisplay.includes('2'):
                    resizeMainTabDiv.nonDisplay.splice(id,1)
            }
        break;
        // default:
        //     switch(true)
        //     {
        //         case !resizeMainTabDiv.nonDisplay.includes('2'):
        //             resizeMainTabDiv.nonDisplay.push('2')
        //     }
    }
    useState('mainDisplayPanel',{type:'a',value:mainDisplayPanel});
    useState('resizeMainTabDiv',{type:'a',value:resizeMainTabDiv})
}

function setMediaQuery1000()
{
    const mainDisplayPanel = getState('mainDisplayPanel');
    const resizeMainTabDiv = getState('resizeMainTabDiv')
    switch(true)
    {
        case Number(window.innerWidth) >= 1000:
            mainDisplayPanel.childSize = 4;
            resizeMainTabDiv.currentClick = '4'
            let id = resizeMainTabDiv.nonDisplay.indexOf('4');
            switch(true)
            {
                case resizeMainTabDiv.nonDisplay.includes('4'):
                    resizeMainTabDiv.nonDisplay.splice(id,1)
            }
        break;
        default:
            switch(true)
            {
                case !resizeMainTabDiv.nonDisplay.includes('4'):
                    resizeMainTabDiv.nonDisplay.push('4')
            }
    }
    useState('mainDisplayPanel',{type:'a',value:mainDisplayPanel})
    useState('resizeMainTabDiv',{type:'a',value:resizeMainTabDiv})
}

virtualDom['container'].addEventListener('scroll', e =>{
    const topStickyNav = getState('topStickyNav')
    switch(true)
    {
        case Number(e.target.scrollTop) >= 42:
            topStickyNav.sh = preState(['container','colors','shadow'],'')
        break;
        default:
            topStickyNav.sh = 'transparent'
    }
    useState('topStickyNav', {type:'a',value:topStickyNav})
})