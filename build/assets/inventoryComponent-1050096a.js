var f=Object.defineProperty;var S=(a,t,e)=>t in a?f(a,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):a[t]=e;var i=(a,t,e)=>(S(a,typeof t!="symbol"?t+"":t,e),e);import{$ as l}from"./pageCommonInit-9ea57622.js";import{C as w,a as v,M as h}from"./modalGeneral-91a492db.js";class D{constructor(){i(this,"cardElement",l(`
    <div class="card cardComponent">
        <!--Sección: título de la carta-->
        <div class="container-fluid cardComponent-section cardComponent-text text-center" id="cardTitle"></div>
        <!--Sección: imagen de la carta-->
        <div class="container-fluid cardComponent-section">
            <img class="cardComponent-image" style="height: 120px;">
            <img class="cardComponent-icon">
        </div>
    </div>
    `));i(this,"smallCardElement",l(`
    <div class="card cardComponent-small">
    <!--Sección: título de la carta-->
    <div class="container-fluid cardComponent-section-small cardComponent-text-small text-center" id="cardTitle"></div>
    <!--Sección: imagen de la carta-->
    <div class="container-fluid cardComponent-section-small">
        <img class="cardComponent-image" style="height: 120px;">
        <img class="cardComponent-icon">
    </div>
</div>
    `));i(this,"render",(t,e,r)=>{t.append(e),r!=null&&(l("#btnSkip").on("click",()=>{console.log("Clicked on skip!"),r.notifyTurnSkip()}),l("#btnAttack").on("click",()=>{console.log("En Guardia!"),r.notifyAttackButtonPressed()}))});i(this,"renderCardHeader",(t,e)=>{t.find("#cardTitle").text(e.nombre.toString()),t.find(".cardComponent-image").attr("src",`https://cards.thenexusbattles2.cloud/assets/${e.imagen}`),t.find(".cardComponent-icon").attr("src",e.icono)});i(this,"renderCardDesc",t=>{this.cardElement.append(`
        <!--Sección: descripción de la carta-->
        <div class="container-fluid cardComponent-section cardComponent-desc-text">
        ${t}
        </div>
        `)});i(this,"renderSmallCardDesc",t=>{this.smallCardElement.append(`
        <!--Sección: descripción de la carta-->
        <div class="container-fluid cardComponent-section-small cardComponent-desc-text-small">
        ${t}
        </div>
        `)});i(this,"renderHeroeLifeBar",t=>{this.cardElement.append(`
        <!--Sección: barra de vida-->
        <div class="container-fluid cardComponent-lifebar">
            <span style="z-index: 1; font-size: xx-small;" id="vida-stat">${t}</span>
            <span class="cardComponent-lifebar-progress" id="vida-bar-stat"></span>
        </div>
        `)});i(this,"renderHeroeStats",t=>{this.cardElement.append(`
        <!--Sección: Estadísticas tipo héroe-->
        <div class="container-fluid cardComponent-section">
            <div class="cardComponent-heroe-section">
                <span class="cardComponent-heroe-text">Ataque: <span id="ataque-stat">${t.ataqueBase}</span></span>
                <span class="cardComponent-heroe-text">Daño: <span id="daño-stat">${t.daño}</span></span>
            </div>
            <div class="cardComponent-heroe-section">
                <span class="cardComponent-heroe-text">Poder: <span id="poder-stat">${t.poder}</span></span>
                <span class="cardComponent-heroe-text">Defensa: <span id="defensa-stat">${t.defensa}</span></span>
            </div>
        </div>
        `)});i(this,"renderHeroeActionBar",()=>{this.cardElement.append(`
        <!--Sección: Botónes de interacción héroe-->
        <div class="cardComponent-section" id="card-actions">
            <span class="cardComponent-heroe-text">Daño efectivo: <span id="daño-efectivo-stat">12</span></span>
        </div>
        `)});i(this,"renderHeroeButtons",()=>{this.cardElement.find("#card-actions").append(`
            <a id = "btnUpgrade"><svg width="16px" height="16px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><path fill="white" d="M256 29.816l-231 154v106.368l231-154 231 154V183.816zm0 128.043L105 259.783v90.283l151-101.925 151 101.925v-90.283zm0 112l-87 58.725v67.6l87-58 87 58v-67.6zm0 89.957l-87 58v64.368l87-58 87 58v-64.368z"/></svg></a>
            <a id = "btnSkip"><svg width="16px" height="16px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="white" fill-rule="evenodd" d="M8 0a8 8 0 100 16A8 8 0 008 0zM1.5 8a6.5 6.5 0 0110.535-5.096l-9.131 9.131A6.472 6.472 0 011.5 8zm2.465 5.096a6.5 6.5 0 009.131-9.131l-9.131 9.131z" clip-rule="evenodd"/></svg></a>
            <a id = "btnAttack"><svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M11 2a1 1 0 0 1 2 0v2.062A8.004 8.004 0 0 1 19.938 11H22a1 1 0 0 1 0 2h-2.062A8.004 8.004 0 0 1 13 19.938V22a1 1 0 0 1-2 0v-2.062A8.004 8.004 0 0 1 4.062 13H2a1 1 0 0 1 0-2h2.062A8.004 8.004 0 0 1 11 4.062V2zm7 10a6 6 0 1 0-12 0 6 6 0 0 0 12 0zm-3 0a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" fill="white"/></svg></a>
            `)});i(this,"updatePlayerName",t=>{this.cardElement.find("#cardTitle").text(t)});i(this,"getToUpdateStats",t=>this.cardElement.find(`#${t}-stat`))}get getCardElement(){return this.cardElement}get getSmallCardElement(){return this.smallCardElement}}var d=(a=>(a[a.Ally=0]="Ally",a[a.Local=1]="Local",a[a.Enemy=2]="Enemy",a[a.Consumible=3]="Consumible",a))(d||{}),s=(a=>(a[a.InventoryHeroe=0]="InventoryHeroe",a[a.InventoryConsumible=1]="InventoryConsumible",a[a.GameHeroe=2]="GameHeroe",a[a.GameConsumible=3]="GameConsumible",a))(s||{});class b{constructor(t){i(this,"isSelected",!1);i(this,"cardTypeRender");i(this,"clase");i(this,"tipo");i(this,"init",(t,e,r,o,n)=>{this.cardTypeRender=e,this.clase=r.clase,this.tipo=r.tipo,{[s.InventoryHeroe]:()=>this.renderInventoryHeroe(t,r),[s.InventoryConsumible]:()=>this.renderInventoryConsumible(t,r),[s.GameHeroe]:()=>this.renderGameHeroe(t,r,o,n),[s.GameConsumible]:()=>this.renderGameConsumible(t,r)}[e]()});i(this,"renderInventoryHeroe",async(t,e)=>{this.view.renderCardHeader(this.view.getCardElement,e),this.view.renderHeroeStats(e),this.view.renderCardDesc(e.descripcion),this.view.render(t,this.view.getCardElement)});i(this,"renderInventoryConsumible",async(t,e)=>{this.view.renderCardHeader(this.view.getCardElement,e),this.view.renderCardDesc(e.descripcion),this.view.render(t,this.view.getCardElement)});i(this,"renderGameHeroe",async(t,e,r,o)=>{this.view.renderCardHeader(this.view.getCardElement,e),this.view.renderHeroeLifeBar(e.vida),this.view.renderHeroeStats(e),this.view.renderHeroeActionBar(),r==d.Local&&this.view.renderHeroeButtons(),this.view.render(t,this.view.getCardElement,o)});i(this,"renderGameConsumible",(t,e)=>{this.view.renderCardHeader(this.view.getSmallCardElement,e),this.view.renderSmallCardDesc(e.descripcion),this.view.render(t,this.view.getSmallCardElement)});i(this,"getCardNode",()=>this.cardTypeRender==s.GameConsumible?this.view.getSmallCardElement:this.view.getCardElement);i(this,"getCardSelection",()=>this.isSelected);i(this,"setCardSelection",()=>(this.isSelected=!this.isSelected,this.isSelected?this.getCardNode().addClass("cardComponent-selected"):this.getCardNode().removeClass("cardComponent-selected"),this.isSelected));i(this,"updateCardName",t=>{this.view.updatePlayerName(t)});i(this,"updateEfectiveDamage",t=>{this.view.getToUpdateStats("daño-efectivo").text(t)});i(this,"updateCardStats",(t,e)=>{this.view.getToUpdateStats("vida").text(e.getVida());const r=e.getVida()*100/t.vida;this.view.getToUpdateStats("vida-bar").css("background-color",r>60?"rgb(115, 188, 88)":r>=40?"rgb(185, 207, 60)":"rgb(230, 67, 86)"),this.view.getToUpdateStats("vida-bar").css("width",`${r>100?100:r}%`),this.updateSingleStat("ataque",t.ataqueBase,e.getAtaque()),this.updateSingleStat("daño",t.daño,e.getDano()),this.updateSingleStat("poder",t.poder,e.getPoder()),this.updateSingleStat("defensa",t.defensa,e.getDefensa())});i(this,"updateSingleStat",(t,e,r)=>{const o=this.view.getToUpdateStats(t);o.text((r>e?"↑":r<e?"↓":"")+r),r>e?o.css("color","rgb(115, 188, 88)"):r<e?o.css("color","rgb(230, 67, 86)"):o.css("color","white")});i(this,"setButtonsAction",t=>{t?(this.getCardNode().find("#btnUpgrade").show(),this.getCardNode().find("#btnSkip").show(),this.getCardNode().find("#btnAttack").show()):(this.getCardNode().find("#btnUpgrade").hide(),this.getCardNode().find("#btnSkip").hide(),this.getCardNode().find("#btnAttack").hide())});this.view=t}}class y{constructor(t,e,r,o){i(this,"cardComponent");i(this,"consumibleData");i(this,"handleOnDrop");i(this,"init",t=>{t?(this.cardComponent.controller.getCardNode().attr("draggable","true"),this.cardComponent.controller.getCardNode().on("dragstart",e=>this.onDragFunction(e)),this.cardComponent.controller.getCardNode().on("drop",e=>this.onDropped(e))):(this.cardComponent.controller.getCardNode().on("dragover",function(e){e.preventDefault()}),this.cardComponent.controller.getCardNode().on("drop",e=>this.onDropFunction(e)))});i(this,"onDragFunction",t=>{var r,o;const e=JSON.stringify(this.consumibleData);(o=(r=t.originalEvent)==null?void 0:r.dataTransfer)==null||o.setData("text/plain",e)});i(this,"onDropFunction",t=>{const e=JSON.parse(t.originalEvent.dataTransfer.getData("text/plain"));console.log(e),this.handleOnDrop(e,this.cardComponent)});i(this,"onDropped",t=>{t.preventDefault(),console.log("IN REMOVE"),this.cardComponent.controller.getCardNode().remove()});this.cardComponent=t,this.consumibleData=r,this.init(e),o!=null&&(this.handleOnDrop=o)}}class x{constructor(t,e){i(this,"currentGameCards");i(this,"deckStoredCards",[]);i(this,"cardRepository");i(this,"nodeConsumableControl");i(this,"gamamingDatabase",0);i(this,"heroInitial");i(this,"heroInitialID");i(this,"updateDeckNumber");this.dialog=t,this.updateDeckNumber=e,this.currentGameCards=new Map}setFromInventory(t,e){this.cardRepository=t,this.deckStoredCards=e.consumibles,this.heroInitial=this.cardRepository.get(e.heroe),this.heroInitialID=e.heroe,this.updateDeckWithRemainingCards()}initializeFirstCards(){for(let t=0;t<3;t++)this.insertNewCardToActive()}insertNewCardToActive(){if(this.deckStoredCards.length>0){const t=this.deckStoredCards.shift();if(t!=null){const e=new p(l("#deckGameplay"),s.GameConsumible,this.cardRepository.get(t),d.Consumible,this.dialog);new y(e,!0,this.cardRepository.get(t)),this.currentGameCards.set(this.gamamingDatabase,[e,t]),this.gamamingDatabase++}this.updateDeckWithRemainingCards()}}deleteCardFromActive(t){for(let[e,r]of this.currentGameCards)if(t._id==r[1]){r[0].controller.getCardNode().remove(),this.currentGameCards.delete(e);break}this.insertNewCardToActive()}getLocalHeroData(){return this.heroInitial}updateDeckWithRemainingCards(){this.updateDeckNumber(this.deckStoredCards.length.toString())}async getCardDataByID(t){if(this.cardRepository.has(t))return new Promise((e,r)=>{e(this.cardRepository.get(t))});{const e=`https://cards.thenexusbattles2.cloud/api/cartas/${t}`;try{const r=await fetch(e);if(!r.ok)throw new Error("No se pudo obtener el héroe");return await r.json()}catch(r){throw r}}}}class M{constructor(){i(this,"strategy")}setStrategy(t){this.strategy=t}executeStrategy(t,e,r=!1){this.strategy.strategyExecutable(t,e,r)}}class A{strategyExecutable(t,e,r){let o=r==!1?t.efecto:t.efectoHeroe,n={poder:0,vida:0,defensa:0,ataqueBase:0,ataqueRnd:0,daño:0};switch(o==null?void 0:o.estadistica){case"Ataque":n.ataqueBase=o.valorafectado;break;case"Defensa":n.defensa=o.valorafectado;break;case"Daño":n.daño=o.valorafectado;break;case"Vida":n.vida=o.valorafectado;break;case"Poder":n.poder=o.valorafectado;break}e(n,Number(o==null?void 0:o.turnosvalidos))}}class m{constructor(t,e=void 0){i(this,"heroProperties");i(this,"previousDecorator");this.heroProperties=t,this.previousDecorator=e}reduceTurnsRemaining(){}getPoder(){return this.heroProperties.poder}getVida(){return this.heroProperties.vida}getDefensa(){return this.heroProperties.defensa}getAtaque(){return this.heroProperties.ataqueBase}getDano(){return this.heroProperties.daño}}class g extends m{constructor(e,r,o){super(e,r);i(this,"turnsRemaining",0);this.turnsRemaining=o}getPoder(){let e=this.previousDecorator!=null?this.previousDecorator.getPoder():0;return(this.turnsRemaining==-1||this.turnsRemaining>0?this.heroProperties.poder:0)+e}getVida(){let e=this.previousDecorator!=null?this.previousDecorator.getVida():0;return(this.turnsRemaining==-1||this.turnsRemaining>0?this.heroProperties.vida:0)+e}getDefensa(){let e=this.previousDecorator!=null?this.previousDecorator.getDefensa():0;return(this.turnsRemaining==-1||this.turnsRemaining>0?this.heroProperties.defensa:0)+e}getAtaque(){let e=this.previousDecorator!=null?this.previousDecorator.getAtaque():0;return(this.turnsRemaining==-1||this.turnsRemaining>0?this.heroProperties.ataqueBase:0)+e}getDano(){let e=this.previousDecorator!=null?this.previousDecorator.getDano():0;return(this.turnsRemaining==-1||this.turnsRemaining>0?this.heroProperties.daño:0)+e}reduceTurnsRemaining(){this.turnsRemaining=this.turnsRemaining>0&&this.turnsRemaining!=-1?this.turnsRemaining-1:0,this.previousDecorator!=null&&this.previousDecorator.reduceTurnsRemaining()}}var u=(a=>(a[a.None=0]="None",a[a.Attack=1]="Attack",a))(u||{});class L extends w{constructor(e){super(e);i(this,"playerMap");i(this,"decoratorMap");i(this,"localSessionID");i(this,"identifier",0);i(this,"current_action",0);i(this,"inventoryManager");i(this,"strategyContext");i(this,"init",async()=>{let e=-1;v.get("Join")==null?e=0:e=1,e!=-1&&this.dialog.notify(this,"nexusStartMatch",{parameter:e,chatNode:l("#chat-insert")})});i(this,"drawLocalPlayer",()=>{this.playerMap.set(this.localSessionID,new p(l("#bottom"),s.GameHeroe,this.inventoryManager.getLocalHeroData(),d.Local,this)),new y(this.playerMap.get(this.localSessionID),!1,void 0,this.handleOnDrop),this.disableButtonsForTurnAction(),console.log(this.inventoryManager.getLocalHeroData()),this.decoratorMap.set(this.localSessionID,new m(this.inventoryManager.getLocalHeroData())),this.updateTextForDeck("30")});i(this,"drawNewPlayer",(e,r)=>{if(this.identifier<3){let o="#top";this.identifier==1?o="#left":this.identifier==2&&(o="#right"),this.inventoryManager.getCardDataByID(r).then(n=>{this.playerMap.set(e,new p(l(o),s.GameHeroe,n,d.Enemy,this)),this.identifier++,this.inventoryManager.cardRepository.set(r,n),this.decoratorMap.set(e,new m(n)),this.playerMap.get(e).controller.getCardNode().on("click",()=>{this.dialog.notify(this,"rivalCardPressed",{currentAction:this.current_action,remoteID:e})})})}});i(this,"registerPlayerDecorator",(e,r)=>{const o=new g(e,this.decoratorMap.get(this.localSessionID),r);this.decoratorMap.set(this.localSessionID,o),this.playerMap.get(this.localSessionID).controller.updateCardStats(this.inventoryManager.getLocalHeroData(),this.decoratorMap.get(this.localSessionID)),this.dialog.notify(this,"createdLocalDecorator",{remoteID:this.localSessionID,heroe:e,turnos:r,remoteCardID:this.inventoryManager.heroInitialID})});i(this,"registerRemoteDecorator",(e,r,o,n)=>{this.inventoryManager.getCardDataByID(n).then(c=>{const C=new g(r,this.decoratorMap.get(e),o);this.decoratorMap.set(e,C),this.playerMap.get(e).controller.updateCardStats(c,this.decoratorMap.get(e))})});i(this,"enableButtonsForTurnAction",()=>{this.playerMap.get(this.localSessionID).controller.setButtonsAction(!0)});i(this,"disableButtonsForTurnAction",()=>{this.playerMap.get(this.localSessionID).controller.setButtonsAction(!1)});i(this,"setCurrentAction",e=>{this.current_action=e});i(this,"handleRemoteAnim",e=>{});i(this,"updateTextForDeck",e=>{l("#count").text(`Restantes:${e}`)});i(this,"handleOnDrop",(e,r)=>{if(this.strategyGenerator(e.efecto.id_estrategia),this.strategyContext.executeStrategy(e,this.registerPlayerDecorator),e.efectoHeroe!=null){const o=this.playerMap.get(this.localSessionID);e.clase==o.controller.clase&&e.tipo==o.controller.tipo&&(this.strategyGenerator(e.efectoHeroe.id_estrategia),this.strategyContext.executeStrategy(e,this.registerPlayerDecorator,!0))}this.inventoryManager.deleteCardFromActive(e),this.dialog.notify(this,"ClientSkipAction",{})});i(this,"strategyGenerator",e=>{switch(e){case 0:this.strategyContext.setStrategy(new A);break}});i(this,"updateDecorators",()=>{this.decoratorMap.forEach((e,r)=>{e.reduceTurnsRemaining()})});i(this,"getDamageValue",e=>{const r=this.decoratorMap.get(this.localSessionID),o=this.decoratorMap.get(e);let n=0;return r!=null&&o!=null&&r.getAtaque()+Math.floor(Math.random()*(r.getAtaque()-1+1)+1)>o.getDefensa()&&(n=Math.floor(Math.random()*(r.getDano()-1+1)+1)),this.updateClientEffectiveDamage(this.localSessionID,n),n});this.playerMap=new Map,this.decoratorMap=new Map,this.inventoryManager=new x(this,this.updateTextForDeck),this.strategyContext=new M}setMyLocalSessionID(e){this.localSessionID=e}updateCardStats(e,r){this.playerMap.get(e).update(r)}updateClientEffectiveDamage(e,r){this.playerMap.get(e).controller.updateEfectiveDamage(r)}}class p{constructor(t,e,r,o,n){i(this,"view",new D);i(this,"controller",new b(this.view));i(this,"viewContext");this.viewContext=n,this.controller.init(t,e,r,o,this)}isThisTheLocalCard(){var t;return this==((t=this.viewContext)==null?void 0:t.playerMap.get(this.viewContext.localSessionID))}notifyTurnSkip(){this.isThisTheLocalCard()&&this.viewContext&&(this.viewContext.dialog.notify(this.viewContext,"ClientSkipAction",{}),this.viewContext.setCurrentAction(u.None))}notifyAttackButtonPressed(){this.isThisTheLocalCard()&&this.viewContext&&this.viewContext.setCurrentAction(u.Attack)}}class k{constructor(){i(this,"inventoryCardsInView",[]);i(this,"inventoryCardMap",new Map);i(this,"inventorySelectionData",{heroe:[],armas:[],armaduras:[],items:[],epicas:[],epicasHeroe:[]});i(this,"getUserInventory",async()=>{let t={Authorization:v.get("access_token")},e=await fetch("https://webserver.thenexusbattles2.cloud/ver-inventario",{method:"GET",headers:t});return e.status==200?JSON.parse(await e.text()):JSON.parse(E)});i(this,"getCard",async t=>{const e=`https://cards.thenexusbattles2.cloud/api/cartas/${t}`;try{const r=await fetch(e);if(!r.ok)throw new Error("No se pudo obtener el héroe");return await r.json()}catch(r){throw r}})}}const E=`
[
    {
      "id": 26,
      "user": "Administrador",
      "id_carta": "650f38ee7aaeb67f7dfc7130",
      "quantity": 1,
      "type": "Heroes"
    },
    {
      "id": 26,
      "user": "Administrador",
      "id_carta": "650f390b7aaeb67f7dfc7138",
      "quantity": 2,
      "type": "Armas"
    },
    {
      "id": 26,
      "user": "Administrador",
      "id_carta": "650f390b7aaeb67f7dfc7139",
      "quantity": 2,
      "type": "Armas"
    },
    {
      "id": 26,
      "user": "Administrador",
      "id_carta": "650f390b7aaeb67f7dfc7142",
      "quantity": 3,
      "type": "Armaduras"
    },
    {
      "id": 26,
      "user": "Administrador",
      "id_carta": "650f390b7aaeb67f7dfc7148",
      "quantity": 1,
      "type": "Items"
    },
    {
      "id": 26,
      "user": "Administrador",
      "id_carta": "650f390b7aaeb67f7dfc714b",
      "quantity": 3,
      "type": "Epicas"
    },
    {
      "id": 26,
      "user": "Administrador",
      "id_carta": "650f390b7aaeb67f7dfc714d",
      "quantity": 5,
      "type": "Epicas"
    },
    {
      "id": 26,
      "user": "Administrador",
      "id_carta": "650f390b7aaeb67f7dfc7150",
      "quantity": 3,
      "type": "Epicas"
    }
  ]
`;class H{constructor(){i(this,"inventoryElement",l(`
        <div class="selection">
            <div class="row justify-content-center" id="cardlist">
            </div>
        </div>
    `));i(this,"footerElement",l(`
    <div class="card-footer">
            <div class="d-flex flex-row justify-content-between align-items-center">
            <p class="h6"><b id="footer-info">Héroes: 0/1 | Armas: 0/2 | Armaduras: 0/1 | Ítems: 0/1 | Épicas: 0/5 | Épicas Héroe: 0/4</b></p>
            <button type="button" class="btn btn-nexus" id="ready-button">Estoy listo!</button>
            </div>
    </div>
`));i(this,"render",t=>{t.append(this.inventoryElement),t.parent().append(this.footerElement)});i(this,"updateFooterActions",t=>{this.footerElement.find("#footer-info").text(`Héroes: ${t.heroe.length}/1 | Armas: ${t.armas.length}/2 | Armaduras: ${t.armaduras.length}/1 | Ítems: ${t.items.length}/1 | Épicas: ${t.epicas.length}/5 | Épicas Héroe: ${t.epicasHeroe.length}/4`)});i(this,"getInventoryList",()=>this.inventoryElement.find("#cardlist"));i(this,"addActionButtonListener",t=>{this.footerElement.find("#ready-button").on("click",()=>t())})}deleteRenderFooter(){this.footerElement.remove()}}class I{constructor(t=new H,e=new k){i(this,"functionBreaker");i(this,"init",(t,e)=>{this.view.addActionButtonListener(this.inventoryToGame),this.view.render(t),this.functionBreaker=e,this.inventoryRender()});i(this,"inventoryRender",async()=>{const t=await this.model.getUserInventory();await Promise.all(t.map(async e=>{const r=e.type==="Heroes"?s.InventoryHeroe:s.InventoryConsumible;for(let o=0;o<e.quantity;o++)await this.cardRender(r,e.id_carta)}))});i(this,"cardRender",async(t,e)=>{if(!this.model.inventoryCardMap.has(e)){const c=await this.model.getCard(e);this.model.inventoryCardMap.set(e,c)}const r=this.model.inventoryCardMap.get(e),o=new p(this.view.getInventoryList(),t,r,d.Consumible),n=o.controller.getCardNode();n.addClass("col-2 card-col"),n.on("click",()=>this.validateCardSelection(o,r)),this.model.inventoryCardsInView.push(o)});i(this,"validateCardSelection",(t,e)=>{if(!this.checkHeroeSelection(e.coleccion)||!this.checkCardTypeOfHeroe(e.coleccion,e.clase,e.tipo))return;({Heroes:()=>{const o=t.controller.getCardSelection();if(o)return this.resetSelection();this.isCardMaxSelection(this.model.inventorySelectionData.heroe,o,1,e.coleccion)||this.updateCardSelection(t.controller.setCardSelection(),this.model.inventorySelectionData.heroe,e._id)},Armas:()=>{const o=t.controller.getCardSelection();this.isCardMaxSelection(this.model.inventorySelectionData.armas,o,2,e.coleccion)||this.updateCardSelection(t.controller.setCardSelection(),this.model.inventorySelectionData.armas,e._id)},Armaduras:()=>{const o=t.controller.getCardSelection();this.isCardMaxSelection(this.model.inventorySelectionData.armaduras,o,1,e.coleccion)||this.updateCardSelection(t.controller.setCardSelection(),this.model.inventorySelectionData.armaduras,e._id)},Items:()=>{const o=t.controller.getCardSelection();this.isCardMaxSelection(this.model.inventorySelectionData.items,o,1,e.coleccion)||this.updateCardSelection(t.controller.setCardSelection(),this.model.inventorySelectionData.items,e._id)},Epicas:()=>{const o=t.controller.getCardSelection(),n=this.model.inventoryCardMap.get(this.model.inventorySelectionData.heroe[0]);if(n.clase==e.clase&&n.tipo==e.tipo){if(this.isCardMaxSelection(this.model.inventorySelectionData.epicasHeroe,o,4,e.coleccion+" Héroe"))return;this.updateCardSelection(t.controller.setCardSelection(),this.model.inventorySelectionData.epicasHeroe,e._id)}else{if(this.isCardMaxSelection(this.model.inventorySelectionData.epicas,o,5,e.coleccion))return;this.updateCardSelection(t.controller.setCardSelection(),this.model.inventorySelectionData.epicas,e._id)}}})[e.coleccion]()});i(this,"checkHeroeSelection",t=>this.model.inventorySelectionData.heroe.length==0&&t!="Heroes"?(new h("Error Inventario","Primero debes seleccionar un héroe para elegir otras cartas").toggleModal(),!1):!0);i(this,"checkCardTypeOfHeroe",(t,e,r)=>{if(t=="Heroes"||t=="Epicas")return!0;const o=this.model.inventoryCardMap.get(this.model.inventorySelectionData.heroe[0]);return o.clase!=e||o.tipo!=r?(new h("Error Inventario","La carta que intentas seleccionar no coincide con el con la clase y el tipo de tu héroe elegido").toggleModal(),!1):!0});i(this,"isCardMaxSelection",(t,e,r,o)=>t.length==r&&!e?(new h("Error Inventario",`"Ya seleccionaste el máximo de ${o} posibles"`).toggleModal(),!0):!1);i(this,"updateCardSelection",(t,e,r)=>{t?(e.push(r),this.view.updateFooterActions(this.model.inventorySelectionData)):(e.splice(e.indexOf(r),1),this.view.updateFooterActions(this.model.inventorySelectionData))});i(this,"resetSelection",()=>{this.model.inventoryCardsInView.map(e=>{e.controller.getCardSelection()&&e.controller.setCardSelection()});const t={armaduras:[],armas:[],epicas:[],epicasHeroe:[],heroe:[],items:[]};this.model.inventorySelectionData=t,this.view.updateFooterActions(t)});i(this,"multiplyCardArrays",(t,e)=>t.flatMap(o=>Array(e).fill(o)));i(this,"inventoryToGame",()=>{const t=this.model.inventorySelectionData;if(t.heroe.length!=1||t.armas.length!=2||t.armaduras.length!=1||t.items.length!=1||t.epicas.length!=5||t.epicasHeroe.length!=4)return new h("Error Inventario","Aún te falta seleccionar cartas para iniciar la partida").toggleModal();const e={heroe:this.model.inventorySelectionData.heroe[0],consumibles:[]};e.consumibles=[...this.multiplyCardArrays(t.armas,4),...this.multiplyCardArrays(t.armaduras,4),...this.multiplyCardArrays(t.items,4),...this.multiplyCardArrays(t.epicas,2),...t.epicasHeroe];const r=new Date().getSeconds();e.consumibles.sort(()=>Math.floor(Math.random()*r-.5)),this.functionBreaker({cardDictionary:this.model.inventoryCardMap,cardDeck:e}),this.view.deleteRenderFooter()});this.view=t,this.model=e}}class B{constructor(t,e){i(this,"controller",new I);this.controller.init(t,e)}}export{u as E,L as G,B as I};
