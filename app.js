// ============================================================
// APP.JS — Logique principale Fréquences Thérapeutiques Binaural X
// ============================================================


// ============================================================
// HELPERS UI — Modales & toasts maison (remplacent confirm/alert natifs)
// ============================================================

// Modale de confirmation stylée (remplace confirm())
// Usage callback : showConfirm("Titre", "Msg", function() { ...si Oui... })
// Usage Promise  : const ok = await showConfirmAsync("Titre", "Msg")
let _confirmState = null; // { resolve, resolved }

function showConfirm(title, message, onConfirm, opts) {
  opts = opts || {};
  // Annuler toute promesse en cours (au cas où l'utilisateur enchaîne)
  if (_confirmState && !_confirmState.resolved) {
    _confirmState.resolved = true;
    _confirmState.resolve(false);
    _confirmState = null;
  }
  const confirmLabel = opts.confirmLabel || 'Oui';
  const cancelLabel = opts.cancelLabel || 'Non';
  const confirmColor = opts.confirmColor || 'green'; // green | amber | purple | blue
  const html =
    '<div style="text-align:center;padding:8px 4px">' +
      '<div style="font-size:32px;margin-bottom:12px">' + (opts.icon || '⚠️') + '</div>' +
      '<div style="font-size:17px;font-weight:600;color:var(--text);margin-bottom:8px">' + title + '</div>' +
      '<div style="font-size:14px;color:var(--muted);line-height:1.5;margin-bottom:20px">' + message + '</div>' +
      '<div style="display:flex;gap:10px">' +
        '<button id="ft-confirm-cancel" class="btn btn-secondary" style="flex:1">' + cancelLabel + '</button>' +
        '<button id="ft-confirm-yes" class="btn btn-' + confirmColor + '" style="flex:1">' + confirmLabel + '</button>' +
      '</div>' +
    '</div>';
  showPopup(html);

  function resolve(value) {
    if (_confirmState && _confirmState.resolved) return;
    if (_confirmState) { _confirmState.resolved = true; }
    closePopup();
    if (value && onConfirm) {
      setTimeout(onConfirm, 50);  // laisse la modale se fermer
    }
    if (_confirmState) {
      _confirmState.resolve(value);
      _confirmState = null;
    }
  }

  const yesBtn = document.getElementById('ft-confirm-yes');
  const cancelBtn = document.getElementById('ft-confirm-cancel');
  if (yesBtn) yesBtn.onclick = function() { resolve(true); };
  if (cancelBtn) cancelBtn.onclick = function() { resolve(false); };

  // Clic sur le backdrop = annulation
  setTimeout(function() {
    const popup = document.getElementById('ft-popup');
    if (popup) {
      popup.onclick = function(e) {
        if (e.target === popup) resolve(false); // clic backdrop seulement
      };
    }
  }, 50);
}

// Version Promise — pour usage avec await
function showConfirmAsync(title, message, opts) {
  return new Promise(function(resolve) {
    _confirmState = { resolve: resolve, resolved: false };
    showConfirm(title, message, null, opts);
  });
}

// Alerte stylée (remplace alert())
function customAlert(title, message, opts) {
  opts = opts || {};
  const html =
    '<div style="text-align:center;padding:8px 4px">' +
      '<div style="font-size:40px;margin-bottom:12px">' + (opts.icon || 'ℹ️') + '</div>' +
      '<div style="font-size:17px;font-weight:600;color:var(--text);margin-bottom:8px">' + title + '</div>' +
      '<div style="font-size:14px;color:var(--muted);line-height:1.5;margin-bottom:20px">' + message + '</div>' +
      '<button onclick="closePopup()" class="btn btn-green" style="width:100%">' + (opts.okLabel || 'OK') + '</button>' +
    '</div>';
  showPopup(html);
}

// Toast de feedback (réutilise l'existant, alias)
function customToast(msg, type) {
  showToast(msg);
}

// ============================================================
// SÉCURITÉ AUDIO — try/catch autour de AudioContext
// ============================================================
function createAudioContext() {
  try {
    const Ctor = window.AudioContext || window.webkitAudioContext;
    if (!Ctor) {
      customAlert('Audio non supporté', 'Ton navigateur ne supporte pas Web Audio API. Utilise Chrome, Firefox, Safari ou Edge récent.', {icon:'🔇'});
      return null;
    }
    const ctx = new Ctor();
    // Si le contexte est suspendu (politique autoplay), on tente de le réveiller
    if (ctx.state === 'suspended') {
      ctx.resume().catch(function(){});
    }
    return ctx;
  } catch (e) {
    console.error('AudioContext error:', e);
    customAlert('Audio bloqué', 'Clique d\'abord n\'importe où sur la page pour activer le son, puis réessaie.', {icon:'🔇'});
    return null;
  }
}


function estBase9(hz) {
  let s = Math.abs(hz).toString().replace('.','').replace('-','');
  while(s.length > 1) {
    s = s.split('').reduce(function(a,b){return a+parseInt(b);},0).toString();
  }
  return s === '9';
}

let accEl=document.getElementById('help-accordion');
let guideSections=[];
if(accEl){
  GUIDE.forEach(function(section,i){
    let sec=document.createElement('div');
    sec.style.cssText='margin-bottom:8px;border-radius:12px;border:1px solid var(--amber-border);overflow:hidden';
    let titre=document.createElement('div');
    titre.style.cssText='font-size:14px;font-weight:600;padding:12px 14px;background:var(--s2);cursor:pointer;display:flex;justify-content:space-between;align-items:center;user-select:none;color:var(--amber)';
    let arrow=document.createElement('span');
    arrow.textContent='▶';
    arrow.style.cssText='font-size:10px;transition:transform 0.2s';
    let txtSpan=document.createElement('span');
    txtSpan.innerHTML=section.t;
    titre.appendChild(txtSpan);
    titre.appendChild(arrow);
    let contenu=document.createElement('div');
    contenu.style.cssText='max-height:0;opacity:0;overflow:hidden;transition:max-height 0.35s ease,opacity 0.3s ease,padding 0.3s ease;padding:0 14px;font-size:13px;color:var(--green);line-height:1.7';
    contenu.innerHTML=section.c;
    titre.addEventListener('click',function(){
      let open=contenu.style.maxHeight!=='0px'&&contenu.style.maxHeight!=='';
      contenu.style.maxHeight=open?'0':'2000px';
      contenu.style.opacity=open?'0':'1';
      contenu.style.padding=open?'0 14px':'14px';
      arrow.style.transform=open?'rotate(0deg)':'rotate(90deg)';
    });
    sec.appendChild(titre);
    sec.appendChild(contenu);
    accEl.appendChild(sec);
    guideSections.push({titre:titre,contenu:contenu,arrow:arrow,keywords:section.k});
  });
}
function toggleAide(){
  let m=document.getElementById('help-modal');
  let ouvert=m.style.display==='block';
  if(ouvert){
    m.style.animation='fadeOut 0.2s ease forwards';
    setTimeout(function(){m.style.display='none';m.style.animation='';},200);
  } else {
    m.style.display='block';
    m.style.animation='';
    // Determine which page is active and open the right section
    let pageId='';
    document.querySelectorAll('.page').forEach(function(p){
      if(p.classList.contains('active')){
        let id=p.id;
        if(id==='page-binaural')pageId='binaural';
        else if(id==='page-perso')pageId='perso';
        else if(id==='page-mineraux')pageId='mineraux';
        else if(id==='page-proto')pageId='protocoles';
        else if(id==='page-symptomes')pageId='symptomes';
        else if(id==='page-eveil')pageId='eveil';
        else if(id==='page-pathogenes')pageId='pathogenes';
        else if(id==='page-favs')pageId='favs';
      }
    });
    guideSections.forEach(function(sec){
      sec.contenu.style.display='none';
      sec.contenu.style.maxHeight='0';
      sec.contenu.style.opacity='0';
      sec.contenu.style.padding='0 14px';
      sec.arrow.style.transform='rotate(0deg)';
      if(sec.keywords.indexOf(pageId)>=0){
        sec.contenu.style.display='block';
        sec.contenu.style.maxHeight='2000px';
        sec.contenu.style.opacity='1';
        sec.contenu.style.padding='14px';
        sec.arrow.style.transform='rotate(90deg)';
      }
    });
  }
}

let baseHz=432,diff=1.2,timerMin=13,secondsLeft=0,playing=false,paused=false,pausedSeconds=0;
let activeMinItem=null,currentLabel="Racine - 432 Hz";
let audioCtx=null,leftOsc=null,rightOsc=null,gainNode=null,timerInterval=null;
let seqQueue=[],seqIndex=0,seqType="",seqProtoName="";
let seqEveilDiffs=[];

function saveSession(){try{localStorage.setItem("ft_s",JSON.stringify({hz:baseHz,df:diff,sl:secondsLeft,lb:currentLabel,sq:seqQueue,si:seqIndex,st:seqType,sp:seqProtoName,sd:seqEveilDiffs}));}catch(e){}}

function restoreSession(){try{let s=localStorage.getItem("ft_s");if(!s)return;let d=JSON.parse(s);if(!d.sl||d.sl<=0)return;
  pendingSession=d;
  let bar=document.getElementById("resume-bar");
  document.getElementById("resume-text").textContent="Reprendre : "+(d.lb||"session")+" ("+Math.floor(d.sl/60)+"min)";
  bar.style.display="flex";
  // Also show in player if open
  let pp=document.getElementById('page-player');
  let pro=document.getElementById('player-resume-overlay');
  if(pp&&pp.style.display!=='none'&&pro){
    document.getElementById('player-resume-name').textContent=(d.lb||'session')+' ('+Math.floor(d.sl/60)+'min)';
    pro.style.display='flex';
  }
}catch(e){}}

let pendingSession=null;

function doResume(){
  if(!pendingSession)return;
  let d=pendingSession;
  baseHz=d.hz||432;diff=d.df||1.2;secondsLeft=d.sl;currentLabel=d.lb||"";
  seqQueue=d.sq||[];seqIndex=d.si||0;seqType=d.st||"";seqProtoName=d.sp||"";seqEveilDiffs=d.sd||[];
  timerMin=Math.ceil(d.sl/60);
  document.getElementById("resume-bar").style.display="none";
  // Also hide player resume overlay if present
  let pr=document.getElementById("player-resume-overlay");
  if(pr)pr.style.display="none";
  updateDisplays();updateTimerDisplay();
  if(seqType&&seqQueue.length>0){
    openPlayer();
    startAudioSequence();
  } else {
    startAudio();
  }
  pendingSession=null;
}

function dismissResume(){
  document.getElementById("resume-bar").style.display="none";
  try{localStorage.removeItem("ft_s");}catch(e){}
  pendingSession=null;
}

// CUSTOM FREQUENCY
let liveToneActive=false;
function toggleLiveTone(){
  let btn=document.getElementById("btn-live-tone");
  if(!liveToneActive){
    startLiveTone();
    liveToneActive=true;
    btn.innerHTML="⏹ Arrêter l'écoute";
    btn.style.borderColor="var(--amber-border)";
    btn.style.background="var(--amber-bg)";
    btn.style.color="var(--amber)";
  }else{
    stopLiveTone();
    liveToneActive=false;
    btn.innerHTML="▶ Lancer l'écoute";
    btn.style.borderColor="var(--blue-border)";
    btn.style.background="var(--blue-bg)";
    btn.style.color="var(--blue)";
  }
}
function onBinSlider(){
  let v=parseInt(document.getElementById("bin-slider").value);
  document.getElementById("bin-hz-input").value=v;
  baseHz=v;currentLabel=v+" Hz";
  updateDisplays();
  if(playing&&leftOsc&&rightOsc){
    leftOsc.frequency.setTargetAtTime(baseHz,audioCtx.currentTime,0.02);
    rightOsc.frequency.setTargetAtTime(baseHz+diff,audioCtx.currentTime,0.02);
  }else if(liveToneActive&&liveCtx){
    liveLeft.frequency.setTargetAtTime(baseHz,liveCtx.currentTime,0.02);
    liveRight.frequency.setTargetAtTime(baseHz+diff,liveCtx.currentTime,0.02);
  }
}
let liveCtx=null,liveLeft=null,liveRight=null;
function startLiveTone(){
  if(playing)return;
  if(!liveCtx){
    liveCtx=createAudioContext();
    let merger=liveCtx.createChannelMerger(2);
    let g=liveCtx.createGain();g.gain.value=0.2;
    liveLeft=liveCtx.createOscillator();liveRight=liveCtx.createOscillator();
    liveLeft.type="sine";liveRight.type="sine";
    let lg=liveCtx.createGain();let rg=liveCtx.createGain();
    liveLeft.connect(lg);liveRight.connect(rg);
    lg.connect(merger,0,0);rg.connect(merger,0,1);
    merger.connect(g);g.connect(liveCtx.destination);
    liveLeft.start();liveRight.start();
  }
  liveLeft.frequency.setTargetAtTime(baseHz,liveCtx.currentTime,0.02);
  liveRight.frequency.setTargetAtTime(baseHz+diff,liveCtx.currentTime,0.02);
}
function stopLiveTone(){
  if(liveLeft){liveLeft.stop();liveLeft=null;}
  if(liveRight){liveRight.stop();liveRight=null;}
  if(liveCtx){liveCtx.close();liveCtx=null;}
}
function onBinInput(){
  let v=parseInt(document.getElementById("bin-hz-input").value);
  if(isNaN(v))return;
  v=Math.min(20000,Math.max(20,v));
  document.getElementById("bin-slider").value=v;
  baseHz=v;currentLabel=v+" Hz";
  updateDisplays();
  if(playing&&leftOsc&&rightOsc){
    leftOsc.frequency.setTargetAtTime(baseHz,audioCtx.currentTime,0.02);
    rightOsc.frequency.setTargetAtTime(baseHz+diff,audioCtx.currentTime,0.02);
  }else if(liveToneActive&&liveCtx){
    liveLeft.frequency.setTargetAtTime(baseHz,liveCtx.currentTime,0.02);
    liveRight.frequency.setTargetAtTime(baseHz+diff,liveCtx.currentTime,0.02);
  }
}
function onCustomSlider(){
  let v=parseInt(document.getElementById("custom-slider").value);
  document.getElementById("custom-hz-input").value=v;
  baseHz=v;currentLabel=v+" Hz";
  updateDisplays();
  if(playing&&leftOsc&&rightOsc){
    leftOsc.frequency.setTargetAtTime(baseHz,audioCtx.currentTime,0.02);
    rightOsc.frequency.setTargetAtTime(baseHz+diff,audioCtx.currentTime,0.02);
  }
}
function onCustomInput(){
  let v=parseInt(document.getElementById("custom-hz-input").value);
  if(isNaN(v))return;
  v=Math.min(10000,Math.max(20,v));
  document.getElementById("custom-slider").value=v;
  baseHz=v;currentLabel=v+" Hz";
  updateDisplays();
  if(playing&&leftOsc&&rightOsc){
    leftOsc.frequency.setTargetAtTime(baseHz,audioCtx.currentTime,0.02);
    rightOsc.frequency.setTargetAtTime(baseHz+diff,audioCtx.currentTime,0.02);
  }
}

// PLAYLIST
let playlists={matin:[],soir:[]};
function savePlaylist(slot){try{localStorage.setItem("ft_playlist_"+slot,JSON.stringify(playlists[slot]));}catch(e){}}
function loadPlaylist(){try{["matin","soir"].forEach(function(s){let d=localStorage.getItem("ft_playlist_"+s);if(d)playlists[s]=JSON.parse(d);});}catch(e){}}
function addToPlaylist(hzOrSlot, d, nom, slot, source){
  // Deux modes : addToPlaylist(slot) depuis Binaural, ou addToPlaylist(hz,d,nom,slot,source) depuis Minéraux etc.
  if(typeof hzOrSlot === "string"){
    // Mode Binaural : addToPlaylist("matin")
    let s=hzOrSlot;
    let hz=parseInt(document.getElementById("bin-hz-input").value)||baseHz;
    let dur=Math.round(Math.max(10,Math.min(45,6000/hz)));
    playlists[s].push({hz:hz,d:dur,nom:hz+" Hz",source:""});
    savePlaylist(s);renderPlaylist(s);
  } else {
    // Mode Minéraux/Protocoles : addToPlaylist(hz, d, nom, slot, source)
    let s=slot||"matin";
    playlists[s].push({hz:hzOrSlot,d:d||10,nom:nom||hzOrSlot+" Hz",source:source||""});
    savePlaylist(s);renderPlaylist(s);
    showToast((nom||hzOrSlot+" Hz")+" → "+(s==="matin"?"☀️ Matin":"🌙 Soir"));
  }
}

function showToast(msg){
  let t=document.getElementById("toast-msg");
  if(!t){
    t=document.createElement("div");
    t.id="toast-msg";
    t.style.cssText="position:fixed;bottom:80px;left:50%;transform:translateX(-50%);background:var(--amber);color:#000;padding:8px 16px;border-radius:20px;font-size:13px;font-weight:600;z-index:999;opacity:0;transition:opacity 0.3s";
    document.body.appendChild(t);
  }
  t.textContent=msg;t.style.opacity="1";
  clearTimeout(t._t);t._t=setTimeout(function(){t.style.opacity="0";},2000);
}
function addFreqToPlaylist(hz,d,nom,slot,action,source){
  if(!slot)slot="matin";
  playlists[slot].push({hz:hz,d:d,nom:nom,action:action||"",source:source||""});
  savePlaylist(slot);renderPlaylist(slot);
  showToast(nom+" → "+(slot==="matin"?"☀️ Matin":"🌙 Soir"));
}
function renderPlaylist(slot){
  let el=document.getElementById("playlist-items-"+slot);
  let card=document.getElementById("playlist-card-"+slot);
  if(!el||!card)return;
  el.innerHTML="";
  if(playlists[slot].length===0){
    el.innerHTML="<div style='font-size:12px;color:var(--dim);text-align:center;padding:12px 0'>Vide — ajoute des fréquences depuis Minéraux</div>";
    return;
  }
  let lastSource="";
  playlists[slot].forEach(function(item,i){
    let row=document.createElement("div");
    row.style.cssText="display:flex;align-items:center;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border)";
    row.className="playlist-item";
    row.draggable=true;
    row.dataset.index=i;
    row.addEventListener("dragstart",function(e){e.dataTransfer.setData("text/plain",slot+"|"+i);this.classList.add("dragging");});
    row.addEventListener("dragend",function(){this.classList.remove("dragging");document.querySelectorAll(".playlist-item.drag-over").forEach(function(x){x.classList.remove("drag-over");});});
    row.addEventListener("dragover",function(e){e.preventDefault();this.classList.add("drag-over");});
    row.addEventListener("dragleave",function(){this.classList.remove("drag-over");});
    row.addEventListener("drop",function(e){e.preventDefault();this.classList.remove("drag-over");let data=e.dataTransfer.getData("text/plain").split("|");let fromSlot=data[0],fromIdx=parseInt(data[1]);let toIdx=parseInt(this.dataset.index);if(fromSlot===slot&&fromIdx!==toIdx){let item=playlists[slot].splice(fromIdx,1)[0];playlists[slot].splice(toIdx,0,item);savePlaylist(slot);renderPlaylist(slot);}});
    // Afficher titre de groupe seulement quand la source change
    let itemSource=item.source||"";
    if(itemSource && itemSource!==lastSource){
      let groupHeader=document.createElement("div");
      groupHeader.style.cssText="font-size:11px;color:var(--amber);font-weight:700;padding:8px 0 2px 0;letter-spacing:0.03em";
      groupHeader.textContent="⬡ "+itemSource;
      el.appendChild(groupHeader);
      lastSource=itemSource;
    } else if(!itemSource){
      lastSource="";
    }
    let freqStr="<div><span style=\'font-family:JetBrains Mono,monospace;font-size:13px;font-weight:500;color:var(--blue)\'>"+item.nom+"</span></div>";
    row.innerHTML="<div style=\'flex:1\'>"+freqStr+"</div><span style=\'font-size:11px;color:var(--muted);margin:0 8px\'>"+item.d+"m</span>";
    let delBtn=document.createElement("button");
    delBtn.textContent="✕";
    delBtn.style.cssText="font-size:11px;padding:3px 8px;border-radius:6px;border:1px solid var(--border);background:var(--s2);color:var(--muted);cursor:pointer";
    delBtn.addEventListener("click",function(e){e.stopPropagation();removeFromPlaylist(slot,i);});
    row.appendChild(delBtn);
    el.appendChild(row);
  });
}
function removeFromPlaylist(slot,i){
  playlists[slot].splice(i,1);
  savePlaylist(slot);renderPlaylist(slot);
}
function clearPlaylist(slot){
  playlists[slot]=[];
  savePlaylist(slot);renderPlaylist(slot);
}
function launchPlaylist(slot){
  if(playlists[slot].length===0)return;
  function go(){
    seqQueue=playlists[slot].map(function(p){return{n:p.nom,hz:p.hz,d:p.d,source:p.source||''};});
    seqType="playlist";seqProtoName=slot==="matin"?"Playlist Matin":"Playlist Soir";seqIndex=0;
    let binBtn=document.querySelector('.nav-btn');
    if(binBtn)showPage('binaural',binBtn);
    openPlayer();
    playNextInSequence();
  }
  if(playing){
    showConfirm("Session en cours","Arrêter la session en cours ?",function(){stopAudio();go();},{confirmLabel:'Arrêter & lancer',icon:'⚠️'});
    return;
  }
  go();
}

// PLAYLISTS SAUVEGARDEES (nommees)
let savedPlaylists={};
function loadSavedPlaylists(){try{let d=localStorage.getItem("ft_saved_pl");if(d)savedPlaylists=JSON.parse(d);}catch(e){}}
function persistSaved(){try{localStorage.setItem("ft_saved_pl",JSON.stringify(savedPlaylists));}catch(e){}}
function savePlaylistAs(slot){
  if(playlists[slot].length===0){customAlert("Information", "La playlist est vide.");return;}
  let inp=document.getElementById("save-name-"+slot);
  let nom=inp?inp.value.trim():"";
  if(!nom){customAlert("Information", "Entre un nom dans le champ.");return;}
  savedPlaylists[nom]=playlists[slot].slice();
  persistSaved();renderSavedPlaylists();
  if(inp)inp.value="";
  customAlert("Information", "Playlist \""+nom+"\" sauvegardée.");
}
function loadSavedInto(nom,slot){
  if(!savedPlaylists[nom])return;
  playlists[slot]=savedPlaylists[nom].slice();
  savePlaylist(slot);renderPlaylist(slot);
  customAlert("Information", "\""+nom+"\" chargée dans "+(slot==="matin"?"Matin":"Soir")+".");
}
function deleteSaved(nom){
  delete savedPlaylists[nom];
  persistSaved();renderSavedPlaylists();
}

function toggleSugGroup(id){
  let el=document.getElementById(id);
  let arr=document.getElementById("arr-"+id);
  if(!el)return;
  let open=el.style.display!=="none";
  el.style.display=open?"none":"block";
  if(arr)arr.style.transform=open?"":"rotate(180deg)";
}
function buildSuggestedProtocols(){
  let el=document.getElementById("suggested-protocols-list");
  if(!el)return;
  let html="";
  let matin=SUGGESTED_PROTOCOLS.filter(function(p){return p.slot==="matin";});
  let soir=SUGGESTED_PROTOCOLS.filter(function(p){return p.slot==="soir";});
  function renderGroup(list,slot,label,color,groupId){
    html+="<div style='border:1px solid var(--border);border-radius:10px;margin-bottom:8px;overflow:hidden'>";
    html+="<div onclick='toggleSugGroup(\""+groupId+"\")' style='display:flex;align-items:center;justify-content:space-between;padding:12px 14px;cursor:pointer;background:var(--s2)'>";
    html+="<span style='font-size:14px;font-weight:600;color:"+color+"'>"+label+"</span>";
    html+="<span id='arr-"+groupId+"' style='font-size:12px;color:"+color+";transition:transform 0.2s'>▼</span>";
    html+="</div>";
    html+="<div id='"+groupId+"' style='display:none'>";
    list.forEach(function(p){
      let idx=SUGGESTED_PROTOCOLS.indexOf(p);
      html+="<div style='border-top:1px solid var(--border);padding:10px 14px;background:var(--s1)'>";
      html+="<div style='display:flex;align-items:center;justify-content:space-between;margin-bottom:4px'>";
      html+="<span style='font-size:14px;font-weight:500;color:var(--text)'>"+p.nom+"</span>";
      html+="<button onclick='loadSuggestedProtocol("+idx+")' style='font-size:11px;padding:4px 10px;border-radius:7px;border:1px solid "+(slot==="matin"?"var(--amber-border);background:var(--amber-bg);color:var(--amber)":"var(--purple-border);background:var(--purple-bg);color:var(--purple)")+";cursor:pointer;font-weight:600'>Charger "+(slot==="matin"?"Matin":"Soir")+"</button>";
      html+="</div>";
      html+="<div style='font-size:12px;color:var(--muted);margin-bottom:6px'>"+p.desc+"</div>";
      html+="<div style='display:flex;flex-wrap:wrap;gap:4px'>";
      p.freqs.forEach(function(f){
        html+="<span style='font-size:11px;padding:2px 7px;border-radius:5px;background:var(--s2);border:1px solid var(--border);color:var(--dim)'>"+f.nom+"</span>";
      });
      html+="</div></div>";
    });
    html+="</div></div>";
  }
  renderGroup(matin,"matin","☀ MATIN","var(--amber)","sugg-matin");
  renderGroup(soir,"soir","☽ SOIR","var(--purple)","sugg-soir");
  el.innerHTML=html;
}

function loadSuggestedProtocol(idx){
  let p=SUGGESTED_PROTOCOLS[idx];
  if(!p)return;
  playlists[p.slot]=p.freqs.map(function(f){return{hz:f.hz,d:f.d,nom:f.nom,action:f.action};});
  savePlaylist(p.slot);renderPlaylist(p.slot);
  alert(p.nom+" charge dans "+(p.slot==="matin"?"Matin":"Soir")+" ✓");
}

function renderSavedPlaylists(){
  let el=document.getElementById("saved-playlists-list");
  if(!el)return;
  let noms=Object.keys(savedPlaylists);
  if(noms.length===0){
    el.innerHTML="<div style='font-size:12px;color:var(--dim);text-align:center;padding:12px 0'>Aucune playlist sauvegardée. Utilise le bouton 💾.</div>";
    return;
  }
  el.innerHTML="";
  noms.forEach(function(nom){
    let n=savedPlaylists[nom].length;
    let safeNom=nom.replace(/'/g,"\\'");
    var row=document.createElement("div");
    row.style.cssText="border-bottom:1px solid var(--border);padding:10px 0;";
    var header=document.createElement("div");
    header.style.cssText="display:flex;align-items:center;justify-content:space-between;gap:6px;cursor:pointer;";
    var delBtn=document.createElement("button");
    delBtn.textContent="✕";
    delBtn.style.cssText="font-size:11px;padding:6px 9px;border-radius:8px;border:1px solid var(--border);background:var(--s2);color:var(--muted);cursor:pointer";
    delBtn.addEventListener("click",function(e){e.stopPropagation();deleteSaved(nom);});
    var leftDiv=document.createElement("div");
    leftDiv.style.cssText="flex:1;min-width:0";
    var nameDiv=document.createElement("div");
    nameDiv.style.cssText="font-size:14px;font-weight:500;color:var(--green);overflow:hidden;text-overflow:ellipsis;white-space:nowrap";
    nameDiv.textContent=nom;
    var infoDiv=document.createElement("div");
    infoDiv.style.cssText="font-size:11px;color:var(--muted)";
    infoDiv.textContent=n+" fréquence"+(n>1?"s":"")+" — cliquer pour voir";
    leftDiv.appendChild(nameDiv);
    leftDiv.appendChild(infoDiv);
    header.appendChild(leftDiv);
    header.appendChild(delBtn);
    var detail=document.createElement("div");
    detail.style.cssText="display:none;margin-top:8px;background:var(--s2);border-radius:10px;padding:10px;";
    var items=savedPlaylists[nom];
    var listHtml="";
    items.forEach(function(item,i){
      listHtml+="<div style='font-size:12px;color:var(--green);padding:3px 0;border-bottom:1px solid var(--border)'>"+(i+1)+". "+item.nom+" — "+item.hz+" Hz — "+item.d+" min</div>";
    });
    listHtml+="<div style='display:flex;gap:8px;margin-top:10px;'>"
      +"<button onclick='loadSavedInto(\""+nom.replace(/"/g,'')+"\",\"matin\")' style='flex:1;font-size:12px;padding:8px;border-radius:8px;border:1px solid var(--amber-border);background:var(--amber-bg);color:var(--amber);cursor:pointer'>☀ Charger dans Matin</button>"
      +"<button onclick='loadSavedInto(\""+nom.replace(/"/g,'')+"\",\"soir\")' style='flex:1;font-size:12px;padding:8px;border-radius:8px;border:1px solid var(--purple-border);background:var(--purple-bg);color:var(--purple);cursor:pointer'>☽ Charger dans Soir</button>"
      +"</div>";
    detail.innerHTML=listHtml;
    header.addEventListener("click",function(){
      detail.style.display=detail.style.display==="none"?"block":"none";
    });
    row.appendChild(header);
    row.appendChild(detail);
    el.appendChild(row);
  });
}

// PAUSE
function togglePause(){
  if(!playing&&!paused)return;
  var btn=document.getElementById("pause-btn");
  var pbtn=document.getElementById("player-pause-btn");
  if(!paused){
    paused=true;
    pausedSeconds=secondsLeft;
    if(gainNode&&audioCtx)gainNode.gain.setTargetAtTime(0,audioCtx.currentTime,0.1);
    if(timerInterval){clearInterval(timerInterval);timerInterval=null;}
    btn.innerHTML="▶ Reprendre";
    btn.style.borderColor="var(--amber-border)";
    btn.style.background="var(--amber-bg)";
    btn.style.color="var(--amber)";
    if(pbtn){pbtn.textContent="▶ Reprendre";pbtn.style.borderColor="var(--amber-border)";pbtn.style.background="var(--amber-bg)";pbtn.style.color="var(--amber)";}
  } else {
    paused=false;
    secondsLeft=pausedSeconds;
    if(gainNode)gainNode.gain.setTargetAtTime(0.25,audioCtx.currentTime,0.1);
    if(timerMin>0){
      timerInterval=setInterval(function(){
        secondsLeft--;saveSession();updateTimerDisplay();
        if(secondsLeft<=0){
          playEndChime();
          if(seqQueue&&seqQueue.length>0&&seqIndex<seqQueue.length){
            if(leftOsc){leftOsc.stop();leftOsc=null;}
            if(rightOsc){rightOsc.stop();rightOsc=null;}
            if(audioCtx){audioCtx.close();audioCtx=null;}
            clearInterval(timerInterval);timerInterval=null;
            seqIndex++;
            setTimeout(playNextInSequence,800);
          } else {
            stopAudio();
          }
        }
      },1000);
    }
    btn.innerHTML="⏸ Pause";
    btn.style.borderColor="var(--green-border)";
    btn.style.background="var(--green-bg)";
    btn.style.color="var(--green)";
    if(pbtn){pbtn.textContent="⏸ Pause";pbtn.style.borderColor="var(--green-border)";pbtn.style.background="var(--green-bg)";pbtn.style.color="var(--green)";}
  }
}

function showGuidePopup() {
  var g = document.getElementById('guide-popup');
  if (g) {g.style.display='block';return;}
  g = document.createElement('div');
  g.id='guide-popup';
  g.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:1000;display:flex;align-items:center;justify-content:center;padding:20px';
  g.innerHTML='<div style="background:#1c2235;border:1px solid var(--border);border-radius:16px;padding:24px;max-width:380px;width:100%;max-height:90vh;overflow-y:auto">' +
    '<div style="font-size:16px;font-weight:600;color:var(--green);margin-bottom:14px"> Premiers pas</div>' +
    '<div style="margin-bottom:12px;line-height:1.6;font-size:14px">' +
    '<div style="margin-bottom:10px"><span style="color:var(--green);font-weight:600">1. Choisis une fréquence</span>' +
    '<br><span style="font-size:12px;color:var(--muted)">Navigue dans les onglets Binaural, Minéraux, Protocoles ou Symptômes pour trouver la fréquence qui te correspond.</span></div>' +
    '<div style="margin-bottom:10px"><span style="color:var(--green);font-weight:600">2. Règle le minuteur</span>' +
    '<br><span style="font-size:12px;color:var(--muted)">En bas, choisis la durée : 10, 13, 18, 22 ou 30 minutes. Ou laisse Inf pour illimité.</span></div>' +
    '<div style="margin-bottom:10px"><span style="color:var(--green);font-weight:600">3. Mets ton casque</span>' +
    '<br><span style="font-size:12px;color:var(--muted)">Les fréquences binaurales nécessitent un casque — une oreille entend la gauche, l\u2019autre la droite.</span></div>' +
    '<div style="margin-bottom:10px"><span style="color:var(--green);font-weight:600">4. Appuie sur Lancer</span>' +
    '<br><span style="font-size:12px;color:var(--muted)">La barre en bas de l&#39;écran s&#39;illumine en vert. Tu peux faire pause ou arrêter à tout moment.</span></div></div>' +
    '<div style="margin-bottom:12px;background:var(--s3);border-radius:10px;padding:12px;font-size:12px;line-height:1.5;color:var(--muted)">' +
    '<div style="font-weight:600;color:var(--amber);margin-bottom:4px"> À savoir</div>' +
    'Les protocoles Rife sont en deux phases : S1 = Nettoyage, S2 = Réparation. Bois beaucoup d&#39;eau entre les deux.</div>' +
    '<button onclick="document.getElementById(\'guide-popup\').style.display=\'none\'" style="width:100%;padding:10px;border-radius:10px;border:1px solid var(--green-border);background:var(--green-bg);color:var(--green);font-size:14px;font-weight:600;cursor:pointer"> Compris</button>' +
    '<button onclick="localStorage.removeItem(\'introShown\');document.getElementById(\'guide-popup\').style.display=\'none\'" style="width:100%;margin-top:8px;padding:8px;border-radius:8px;border:1px solid var(--muted);background:transparent;color:var(--green);font-size:12px;cursor:pointer">Réafficher au prochain lancement</button></div>';
  document.body.appendChild(g);
}
function showWelcomeBanner() {
  let b = document.createElement('div');
  b.id='intro-banner';
  b.style.cssText='position:fixed;bottom:80px;left:10px;right:10px;background:#1c2235;border:1px solid var(--border);color:var(--green);padding:16px 18px;border-radius:14px;z-index:999;font-size:13px;max-width:360px;margin:0 auto;box-shadow:0 8px 30px rgba(0,0,0,0.6);animation:fadeIn 0.3s';
  b.innerHTML='<div style="font-size:15px;font-weight:600;color:var(--green);margin-bottom:10px">Bienvenue ' + String.fromCodePoint(0x1F44B) + '</div>' +
    '<div style="margin-bottom:12px;line-height:1.6;font-size:13.5px;color:var(--muted)">' +
    'Un guide d\'aide est disponible sur chaque page : appuie sur le bouton ' +
    '<span style="color:var(--amber);font-weight:600">' + String.fromCodePoint(0x2753) + ' Aide</span> en haut &agrave; droite ' +
    'pour tout savoir sur l\'onglet en cours.</div>' +
    '<button onclick="this.parentElement.remove()" style="width:100%;padding:11px;border-radius:10px;border:1px solid var(--green-border);background:var(--green-bg);color:var(--green);font-size:14px;font-weight:600;cursor:pointer">' + String.fromCodePoint(0x1F44D) + ' Compris</button>';
  document.body.appendChild(b);
  setTimeout(function(){let e=document.getElementById('intro-banner');if(e)e.remove();},120000);
}

function checkFirstVisit() {
  if (localStorage.getItem('introShown')) return;
  // Premiere visite : on affiche d'abord le consentement medical.
  // Le banner de bienvenue s'affiche apres acceptation du consentement.
  let consentDeja = false;
  try { consentDeja = (localStorage.getItem('consentement_medical')==='ok'); } catch(e){}
  if (consentDeja) {
    localStorage.setItem('introShown','true');
    showWelcomeBanner();
    return;
  }
  showConsentModal(function(){
    localStorage.setItem('introShown','true');
    showWelcomeBanner();
  });
}

function showConsentModal(onAccept) {
  let ov = document.createElement('div');
  ov.id='consent-modal';
  ov.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.85);z-index:1100;overflow-y:auto;padding:20px;backdrop-filter:blur(4px);-webkit-backdrop-filter:blur(4px)';
  ov.innerHTML=
    '<div style="max-width:480px;margin:30px auto;background:var(--s1);border:1px solid var(--amber-border);border-radius:20px;padding:26px;box-shadow:0 20px 60px rgba(0,0,0,0.6);animation:modalIn 0.3s ease-out">' +
    '<div style="text-align:center;font-size:38px;margin-bottom:8px">' + String.fromCodePoint(0x26A0,0xFE0F) + '</div>' +
    '<h2 style="margin:0 0 16px;font-size:21px;color:var(--amber);text-align:center;font-weight:600">Avertissement important</h2>' +
    '<p style="font-size:14px;color:var(--text);line-height:1.6;margin-bottom:14px">Cette application propose des fr&eacute;quences sonores &agrave; vis&eacute;e de <b>bien-&ecirc;tre et de relaxation</b>.</p>' +
    '<p style="font-size:14px;color:var(--muted);line-height:1.6;margin-bottom:14px">Elle <b style="color:var(--amber)">n\'est pas un dispositif m&eacute;dical</b> et ne remplace en aucun cas un avis, un diagnostic ou un traitement m&eacute;dical. En cas de probl&egrave;me de sant&eacute;, consultez un professionnel de sant&eacute; qualifi&eacute;.</p>' +
    '<p style="font-size:13.5px;color:var(--muted);line-height:1.6;margin-bottom:18px">D&eacute;conseill&eacute; en cas d\'&eacute;pilepsie, de port d\'un pacemaker, de grossesse, ou pour les jeunes enfants, sauf avis m&eacute;dical. N\'utilisez pas en conduisant ou en manipulant des machines.</p>' +
    '<label style="display:flex;align-items:flex-start;gap:10px;cursor:pointer;background:var(--s2);border:1px solid var(--border);border-radius:12px;padding:14px;margin-bottom:18px">' +
    '<input type="checkbox" id="consent-check" style="margin-top:2px;width:20px;height:20px;flex-shrink:0;accent-color:var(--green);cursor:pointer">' +
    '<span style="font-size:13.5px;color:var(--text);line-height:1.5">J\'ai lu et compris cet avertissement. J\'utilise cette application &agrave; des fins de bien-&ecirc;tre, sous ma propre responsabilit&eacute;.</span></label>' +
    '<button id="consent-btn" disabled style="width:100%;padding:15px;border-radius:14px;border:1.5px solid var(--green-border);background:var(--green-bg);color:var(--green);font-family:\'Outfit\',sans-serif;font-size:16px;font-weight:600;cursor:not-allowed;opacity:0.4;transition:all 0.2s ease">Commencer</button>' +
    '</div>';
  document.body.appendChild(ov);
  let chk=document.getElementById('consent-check');
  let btn=document.getElementById('consent-btn');
  chk.addEventListener('change',function(){
    btn.disabled=!chk.checked;
    btn.style.opacity=chk.checked?'1':'0.4';
    btn.style.cursor=chk.checked?'pointer':'not-allowed';
  });
  btn.addEventListener('click',function(){
    if(!chk.checked)return;
    try{localStorage.setItem('consentement_medical','ok');}catch(e){}
    ov.remove();
    if(typeof onAccept==='function')onAccept();
  });
}

function filterSympList(query){
  let cards=document.querySelectorAll("#symp-list .proto-card");
  let q=query.toLowerCase();
  cards.forEach(function(card){
    let text=card.textContent.toLowerCase();
    card.style.display=text.includes(q)||q===""?"":"none";
  });
  let sections=document.querySelectorAll("#symp-list > div");
  sections.forEach(function(sec){
    let hasVisible=false;
    sec.querySelectorAll(".proto-card").forEach(function(c){if(c.style.display!=="none")hasVisible=true;});
    sec.style.display=hasVisible?"":"none";
  });
}

function filterProtoList(query){
  let cards=document.querySelectorAll("#proto-list .proto-card");
  let q=query.toLowerCase();
  cards.forEach(function(card){
    let text=card.textContent.toLowerCase();
    card.style.display=text.includes(q)||q===""?"":"none";
  });
  let sections=document.querySelectorAll("#proto-list > div");
  sections.forEach(function(sec){
    let hasVisible=false;
    sec.querySelectorAll(".proto-card").forEach(function(c){if(c.style.display!=="none")hasVisible=true;});
    sec.style.display=hasVisible?"":"none";
  });
}

function filterMinList(query,cat){
  let items=document.querySelectorAll("#min-items-container .freq-item");
  let q=query.toLowerCase();
  items.forEach(function(item){
    let nom=item.querySelector(".freq-item-name").textContent.toLowerCase();
    let sub=item.querySelector(".freq-item-sub")?item.querySelector(".freq-item-sub").textContent.toLowerCase():"";
    let matches=(nom.includes(q)||sub.includes(q)||q==="");
    item.style.display=matches?"":"none";
  });
}

// ====== EXPORT WAV ======
// NOTE: exportWav() est défini plus bas dans ce fichier (ligne ~2520).
// Cette ancienne version sans métadonnées a été supprimée pour éviter
// le shadowing par hoisting. La nouvelle version délègue à
// exportWavWithMetadata() qui ajoute un chunk RIFF 'ftmd' pour permettre
// l'import direct dans l'app.

function init(){
  document.getElementById("bin-slider").value=baseHz;
  document.getElementById("bin-hz-input").value=baseHz;

  const oc=document.getElementById("onde-chips");
  ONDES.forEach((o,i)=>{
    const b=document.createElement("button");
    b.className="chip"+(i===0?" b":"");
    b.innerHTML="<span>"+o.nom+"</span><span class='sub'>"+o.label+"</span>";
    b.onclick=function(){
      document.querySelectorAll("#onde-chips .chip").forEach(function(x,j){x.className="chip"+(j===i?" b":"");});
      diff=o.diff;updateDisplays();
      if(playing&&leftOsc&&rightOsc){leftOsc.frequency.setTargetAtTime(baseHz,audioCtx.currentTime,0.05);rightOsc.frequency.setTargetAtTime(baseHz+diff,audioCtx.currentTime,0.05);}
    };
    oc.appendChild(b);
  });

  const tc=document.getElementById("timer-chips");
  TIMERS.forEach((t,i)=>{
    const b=document.createElement("button");
    b.className="t-chip"+(t.v===13?" p":"");
    b.textContent=t.v===0?"inf":t.l+"m";
    b.onclick=function(){
      document.querySelectorAll(".t-chip").forEach(function(x,j){x.className="t-chip"+(j===i?" p":"");});
      timerMin=t.v;if(!playing)updateTimerDisplay();
    };
    tc.appendChild(b);
  });

  buildMineraux();buildProtocoles();buildSymptomes();buildEveil();
  loadPlaylist();renderPlaylist("matin");renderPlaylist("soir");
  loadSavedPlaylists();renderSavedPlaylists();
  buildSuggestedProtocols();
  updateDisplays();
  restoreSession();
  renderFavs();
  updateFavPlaylistBtns();
}

function lancerSequenceEveil(){
  function go(){
    seqQueue=[{n:"Alpha 10 Hz",hz:756,d:11},{n:"Theta 6 Hz",hz:756,d:30}];
    seqEveilDiffs=[10,6];
    seqType="eveil";seqProtoName="Sequence Eveil";seqIndex=0;openPlayer();
    diff=seqEveilDiffs[0];
    playNextInSequence();
  }
  if(playing){
    showConfirm("Session en cours","Arrêter la session et lancer la séquence d'éveil ?",function(){stopAudio();go();},{confirmLabel:'Arrêter & lancer',icon:'⚠️'});
    return;
  }
  go();
}

function lancerVoyageEveil(){
  function go(){
    seqQueue=CHAKRAS.map(function(c){return{n:c.nom,hz:c.hz,d:c.duree};});
    seqEveilDiffs=CHAKRAS.map(function(){return 40;});
    seqType="eveil_chakras";seqProtoName="Voyage Eveil";seqIndex=0;openPlayer();
    diff=40;
    playNextInSequence();
  }
  if(playing){
    showConfirm("Session en cours","Arrêter la session et lancer le voyage d'éveil ?",function(){stopAudio();go();},{confirmLabel:'Arrêter & lancer',icon:'⚠️'});
    return;
  }
  go();
}

function buildEveil(){
  let SOLFEGE=[
    {nom:"Libération",hz:396,action:"Peur et culpabilité"},
    {nom:"Harmonie",hz:432,action:"Accord naturel universel"},
    {nom:"Connexion",hz:639,action:"Relations et amour"},
    {nom:"Éveil divin",hz:963,action:"Conscience supérieure"}
  ];
  let sl=document.getElementById("solfege-list");
  SOLFEGE.forEach(function(s){
    let el=document.createElement("div");
    el.className="freq-item";
    el.innerHTML="<div class='freq-item-left'><span class='freq-item-name'>"+s.nom+"</span> <span class='freq-item-sub'>"+s.action+"</span></div><div class='freq-item-right'><span class='freq-item-hz'>"+s.hz+" <span class='freq-item-dur'>"+Math.round(Math.max(10,Math.min(45,6000/s.hz)))+"m</span></span></div>";
    el.onclick=function(){loadFreq(s.hz,Math.round(Math.max(10,Math.min(45,6000/s.hz))),s.nom);openPlayer();};
    sl.appendChild(el);
  });

  // Chakras G40
  let cl=document.getElementById("chakra-eveil-list");
  CHAKRAS.forEach(function(c){
    let el=document.createElement("div");
    el.className="freq-item";
    el.innerHTML="<div class='freq-item-left'><span class='freq-item-name'>"+c.nom+"</span> <span class='freq-item-sub'>G 40 Hz · "+c.duree+"m</span></div><div class='freq-item-right'><span class='freq-item-hz'>"+c.hz+" <span class='freq-item-dur'>+40Hz</span></span></div>";
    el.onclick=function(){
      diff=40;
      loadFreq(c.hz,c.duree,c.nom+" G40");
      openPlayer();
    };
    cl.appendChild(el);
  });
}

function lancerVoyageChakras(){
  function go(){
    seqQueue=CHAKRAS.map(function(c){return{n:c.nom,hz:c.hz,d:c.duree};});
    seqType="chakras";seqProtoName="Voyage chakras";seqIndex=0;openPlayer();
    playNextInSequence();
  }
  if(playing){
    showConfirm("Session en cours","Arrêter la session et lancer le voyage des chakras ?",function(){stopAudio();go();},{confirmLabel:'Arrêter & lancer',icon:'⚠️'});
    return;
  }
  go();
}

function updateVoyageBtn(){
  let btn=document.getElementById("voyage-btn");
  if(!btn)return;
  if(seqType==="chakras"&&playing&&seqIndex<seqQueue.length){
    let idx=seqIndex+1;
    btn.textContent="✦ En cours : "+seqQueue[seqIndex].n+" ("+idx+"/9)";
    btn.style.borderColor="var(--green-border)";
    btn.style.background="var(--green-bg)";
    btn.style.color="var(--green)";
  } else {
    btn.textContent="✦ Voyage au cœur des chakras";
    btn.style.borderColor="var(--purple-border)";
    btn.style.background="var(--purple-bg)";
    btn.style.color="var(--purple)";
  }
}

// onChakraSelect supprime (element chakra-select inexistant)

function loadFreq(hz,d,nom){
  function go(){
    baseHz=hz;timerMin=d;currentLabel=nom+" - "+hz+" Hz";
    setTimerChip(d);updateDisplays();
  }
  if(playing){
    showConfirm("Session en cours","Arrêter et charger "+nom+" ?",function(){stopAudio();go();},{confirmLabel:'Charger',icon:'🎵'});
    return;
  }
  go();
}

function setTimerChip(d){
  document.querySelectorAll(".t-chip").forEach(function(x,j){x.className="t-chip"+(TIMERS[j].v===d?" p":"");});
}

function updateDisplays(){
  document.getElementById("f-left").textContent=baseHz;
  document.getElementById("f-right").textContent=(baseHz+diff).toFixed(1);
  let beatEl=document.getElementById("f-beat");beatEl.textContent=diff%1===0?diff:diff.toFixed(1);beatEl.style.color="var(--blue)";
  document.getElementById("pb-freq").textContent=currentLabel+" - D "+diff+" Hz";
  updateTimerDisplay();
}

function updateTimerDisplay(){
  const el=document.getElementById("pb-timer");
  if(timerMin===0){el.className="play-bar-timer inactive";el.textContent="--:--";updatePlayerDisplay();return;}
  const s=(playing||paused)?secondsLeft:timerMin*60;
  const m=Math.floor(s/60),sec=s%60;
  el.className="play-bar-timer"+(playing?" playing":"");
  let timeStr=String(m).padStart(2,"0")+":"+String(sec).padStart(2,"0");
  if(seqQueue&&seqQueue.length>0){
    let pos=(seqIndex+1)+"/"+seqQueue.length;
    el.textContent=timeStr+" · "+pos;
  } else {
    el.textContent=timeStr;
  }
  updatePlayerDisplay();
}
function togglePlay(){if(playing)stopAudio();else startAudio();}

function startAudio(){
  stopLiveTone();
  // Indicateur de chargement
  let btn=document.getElementById("play-btn");
  btn.innerHTML="<span>⏳</span><span>Démarrage...</span>";
  btn.disabled=true;
  setTimeout(function(){
  if(audioCtx){audioCtx.close();audioCtx=null;}
  audioCtx=createAudioContext();
  const merger=audioCtx.createChannelMerger(2);
  gainNode=audioCtx.createGain();
  gainNode.gain.setValueAtTime(0,audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.25,audioCtx.currentTime+2);
  leftOsc=audioCtx.createOscillator();rightOsc=audioCtx.createOscillator();
  leftOsc.type="sine";rightOsc.type="sine";
  leftOsc.frequency.value=baseHz;rightOsc.frequency.value=baseHz+diff;
  const lg=audioCtx.createGain();const rg=audioCtx.createGain();
  lg.gain.value=1;rg.gain.value=1;
  leftOsc.connect(lg);rightOsc.connect(rg);
  lg.connect(merger,0,0);rg.connect(merger,0,1);
  merger.connect(gainNode);gainNode.connect(audioCtx.destination);
  leftOsc.start();rightOsc.start();
  playing=true;
  document.getElementById("play-btn").disabled=false;
  document.getElementById("play-btn").className="play-btn playing";
  document.getElementById("play-btn").innerHTML="<span class='pulse'></span>";
  let pb=document.getElementById("pause-btn");
  pb.style.display="flex";pb.innerHTML="\u23f8 Pause";
  pb.style.borderColor="var(--green-border)";pb.style.background="var(--green-bg)";pb.style.color="var(--green)";
  paused=false;
  updateMediaSession();
  if(timerMin>0){
    secondsLeft=timerMin*60;updateTimerDisplay();
    timerInterval=setInterval(function(){secondsLeft--;saveSession();updateTimerDisplay();if(secondsLeft<=0){playEndChime();stopAudio();}},1000);
  }
  },80);
}

function playEndChime(){
  try{
    var c=new (window.AudioContext||window.webkitAudioContext)();
    var t=c.currentTime;
    [[523.25,0],[659.25,0.35]].forEach(function(n){
      var o=c.createOscillator(),g=c.createGain();
      o.type='sine';o.frequency.value=n[0];
      g.gain.setValueAtTime(0.0001,t+n[1]);
      g.gain.exponentialRampToValueAtTime(0.18,t+n[1]+0.05);
      g.gain.exponentialRampToValueAtTime(0.0001,t+n[1]+1.2);
      o.connect(g);g.connect(c.destination);
      o.start(t+n[1]);o.stop(t+n[1]+1.3);
    });
    setTimeout(function(){try{c.close();}catch(e){}},2200);
  }catch(e){}
}

function stopAudio(userStop){
  if(gainNode&&audioCtx){
    gainNode.gain.setValueAtTime(gainNode.gain.value,audioCtx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0,audioCtx.currentTime+1.5);
  }
  setTimeout(function(){
  if(leftOsc){try{leftOsc.stop();}catch(e){}leftOsc=null;}
  if(rightOsc){try{rightOsc.stop();}catch(e){}rightOsc=null;}
  if(userStop){try{localStorage.removeItem("ft_s");}catch(e){}}
  if(audioCtx){audioCtx.close();audioCtx=null;}
  if(timerInterval){clearInterval(timerInterval);timerInterval=null;}
  playing=false;
  document.getElementById("play-btn").className="play-btn";
  document.getElementById("play-btn").innerHTML="<span>▶</span>";
  let _pb=document.getElementById("pause-btn");if(_pb)_pb.style.display="none";
  paused=false;pausedSeconds=0;
  secondsLeft=0;updateTimerDisplay();updateVoyageBtn();
  if('mediaSession' in navigator)navigator.mediaSession.playbackState='none';
  // Show restart button in player if open
  let pp=document.getElementById('page-player');
  if(pp&&pp.style.display!=='none'){
    let doneHtml='<div style="text-align:center;padding:20px">'
      +'<div style="font-size:48px;margin-bottom:16px">✅</div>'
      +'<div style="font-size:18px;font-weight:600;color:var(--text);margin-bottom:8px">Séquence terminée</div>'
      +'<div style="font-size:14px;color:var(--muted);margin-bottom:32px">'+seqProtoName+'</div>'
      +'<button onclick="closePlayer()" style="padding:16px 32px;border-radius:16px;border:1px solid var(--green-border);background:var(--green-bg);color:var(--green);font-size:16px;cursor:pointer">← Retour</button>'
      +'</div>';
    document.querySelector('#page-player > div:nth-child(2)').innerHTML=doneHtml;
  }
  },1500);
}
function updateMediaSession(){
  if(!('mediaSession' in navigator))return;
  navigator.mediaSession.metadata=new MediaMetadata({
    title:currentLabel||'Fréquence Thérapeutique',
    artist:'Fréquences Thérapeutiques Binaural X',
    album:seqQueue&&seqQueue.length>0?seqProtoName:'Session libre',
  });
  navigator.mediaSession.playbackState='playing';
  navigator.mediaSession.setActionHandler('play',function(){
    if(paused)togglePause(document.getElementById('pause-btn'));
    else if(!playing)startAudio();
  });
  navigator.mediaSession.setActionHandler('pause',function(){
    if(playing&&!paused)togglePause(document.getElementById('pause-btn'));
  });
  navigator.mediaSession.setActionHandler('stop',function(){stopAudio();});
  navigator.mediaSession.setActionHandler('nexttrack',function(){
    if(seqQueue&&seqQueue.length>0&&seqIndex<seqQueue.length-1){
      if(leftOsc){try{leftOsc.stop();}catch(e){}leftOsc=null;}
      if(rightOsc){try{rightOsc.stop();}catch(e){}rightOsc=null;}
      if(audioCtx){audioCtx.close();audioCtx=null;}
      if(timerInterval){clearInterval(timerInterval);timerInterval=null;}
      seqIndex++;setTimeout(playNextInSequence,300);
    }
  });
}
let favs=[];
try {
  let storedFavs = localStorage.getItem('ft_favs');
  if(storedFavs) favs = JSON.parse(storedFavs);
} catch(e) {
  // Mode privé ou stockage désactivé : on continue sans crash
}
let activeMinCat='Element';
function toggleFav(nom){
  let idx=favs.indexOf(nom);
  if(idx>=0){favs.splice(idx,1);}else{favs.push(nom);}
  try {
    localStorage.setItem('ft_favs',JSON.stringify(favs));
  } catch(e) {
    // Mode privé : on ignore l'erreur de sauvegarde
  }
  renderFavs();
  updateFavPlaylistBtns();
  // Re-render current mineral category by triggering tab click
  let activeTab=document.querySelector('#min-cat-tabs .cat-tab.active');
  if(activeTab) activeTab.click();
}
function toggleFavPlaylist(slot){
  toggleFav(slot+'_playlist');
}
function updateFavPlaylistBtns(){
  ['matin','soir'].forEach(function(slot){
    let btn=document.getElementById('fav-btn-'+slot);
    if(btn) btn.textContent=favs.indexOf(slot+'_playlist')>=0?'★':'☆';
  });
}
function partagerFavs(){
  let txt="🔮 Mes protocoles favoris :\n";
  let link=window.location.origin+window.location.pathname+"?f=";
  let freqs=[];
  favs.forEach(function(nom){
    if(nom==='matin_playlist'){
      txt+="\n☀ PLAYLIST MATIN :\n";
      playlists['matin'].forEach(function(f){txt+="  • "+f.nom+" — "+f.hz+" Hz — "+f.d+"m\n";freqs.push(f.hz);});
    } else if(nom==='soir_playlist'){
      txt+="\n☽ PLAYLIST SOIR :\n";
      playlists['soir'].forEach(function(f){txt+="  • "+f.nom+" — "+f.hz+" Hz — "+f.d+"m\n";freqs.push(f.hz);});
    }
  });
  if(freqs.length>0){
    link+=freqs.join(",");
    txt+="\n📱 Ouvre ce lien :\n"+link;
  }
  if(navigator.share){
    navigator.share({title:'Mes favoris',text:txt}).catch(function(){});
  } else {
    let box=document.getElementById('favs-share-box');
    let btn=document.getElementById('favs-copy-btn');
    box.textContent=txt;
    box.style.display='block';
    btn.style.display='block';
  }
}
function partagerUnFav(nom){
  let txt="";
  let link=window.location.origin+window.location.pathname+"?p=";
  let freqs=[];
  if(nom==='matin_playlist'){
    txt+="☀ PLAYLIST MATIN :\n";
    playlists['matin'].forEach(function(f){txt+="  • "+f.nom+" — "+f.hz+" Hz — "+f.d+"m\n";freqs.push(f.hz);});
    link+=("matin_"+freqs.join("_"));
  } else if(nom==='soir_playlist'){
    txt+="☽ PLAYLIST SOIR :\n";
    playlists['soir'].forEach(function(f){txt+="  • "+f.nom+" — "+f.hz+" Hz — "+f.d+"m\n";freqs.push(f.hz);});
    link+=("soir_"+freqs.join("_"));
  }
  txt+="\n📱 Clique pour ouvrir et lancer :\n"+link;
  if(navigator.share){
    navigator.share({title:'Partager',text:txt}).catch(function(){});
  } else {
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(txt).then(function(){
        customAlert("Information", 'Texte copié ! Colle-le où tu veux.');
      });
    } else {
      prompt('Copie ce texte :', txt);
    }
  }
}
function copierFavs(){
  let box=document.getElementById('favs-share-box');
  let txt=box.textContent;
  if(navigator.clipboard&&navigator.clipboard.writeText){
    navigator.clipboard.writeText(txt).then(function(){
      let btn=document.getElementById('favs-copy-btn');
      btn.textContent='✅ Copié !';
      setTimeout(function(){btn.textContent='📋 Copier le texte';},2000);
    });
  } else {
    // Fallback: select text
    let range=document.createRange();
    range.selectNodeContents(box);
    let sel=window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  }
}
function renderFavs(){
  let el=document.getElementById('favs-list');
  if(!el)return;
  let actions=document.getElementById('favs-actions');
  if(favs.length===0){
    el.innerHTML="<div style='font-size:13px;color:var(--dim);text-align:center;padding:40px 0'>Ajoute des protocoles ou playlists en favori ⭐</div>";
    if(actions)actions.style.display='none';
    return;
  }
  if(actions)actions.style.display='block';
  el.innerHTML="";
  let headerFreqs="<div style='font-size:11px;color:var(--muted);text-transform:uppercase;letter-spacing:0.05em;margin-bottom:8px'>📋 Mes protocoles et playlists</div>";
  let hasContent=false;
  favs.forEach(function(nom){
    // Check if it's a playlist (matin/soir prefix)
    if(nom==='matin_playlist'){
      hasContent=true;
      headerFreqs+="<div class='freq-item'><div class='freq-item-left'><span class='freq-item-name'>☀ Playlist Matin</span></div><div class='freq-item-right'><button onclick='event.stopPropagation();partagerUnFav(\"matin_playlist\")' style='background:none;border:none;font-size:16px;cursor:pointer;color:var(--green);padding:4px' title='Partager'>📤</button><button onclick='event.stopPropagation();toggleFav(\"matin_playlist\")' style='background:none;border:none;font-size:18px;cursor:pointer;color:var(--amber);padding:4px'>★</button></div></div>";
      return;
    }
    if(nom==='soir_playlist'){
      hasContent=true;
      headerFreqs+="<div class='freq-item'><div class='freq-item-left'><span class='freq-item-name'>☽ Playlist Soir</span></div><div class='freq-item-right'><button onclick='event.stopPropagation();partagerUnFav(\"soir_playlist\")' style='background:none;border:none;font-size:16px;cursor:pointer;color:var(--green);padding:4px' title='Partager'>📤</button><button onclick='event.stopPropagation();toggleFav(\"soir_playlist\")' style='background:none;border:none;font-size:18px;cursor:pointer;color:var(--amber);padding:4px'>★</button></div></div>";
      return;
    }
  });
  if(hasContent) el.innerHTML=headerFreqs;
}
function catLabel(c){
  let L={"Element":"Élément","Mineral":"Minéral","Oligo":"Oligo","Vitamine":"Vitamine","Neuro":"Neuro","Organe":"Organe","Molecule":"Molécule","AA":"Acides Aminés","Pathogene":"🦠 Pathogènes"};
  return L[c]||c;
}
function buildMineraux(){
  let accordion=document.getElementById("min-accordion");
  if(!accordion)return;
  accordion.innerHTML="";

  // Labels des catégories
  let CAT_LABELS={
    "AA":"🧬 Acides Aminés","Acide":"⚗️ Acides & Oméga","Element":"⚛️ Éléments",
    "Mineral":"💎 Minéraux","Oligo":"🔬 Oligo-éléments","Neuro":"🧠 Neuro-transmetteurs",
    "Organe":"🫀 Organes","Vitamine":"💊 Vitamines","Molecule":"🌿 Molécules actives",
    "Pathogene":"🦠 Pathogènes","Combo":"🔗 Combos Synergiques"
  };

  // Ordre des catégories
  let CAT_ORDER=["Vitamine","AA","Acide","Mineral","Oligo","Element","Neuro","Organe","Molecule","Pathogene","Combo"];

  // Combos définis
  let COMBOS=[
    {nom:"😴 Anti-Fatigue Chronique",desc:"B12 + B9 + Fer + Zinc + D3",noms:["Vitamine B12 (cobalamine)","Vitamine B9 (folique)","Fer","Zinc","Vitamine D3 (cholécalciférol)"]},
    {nom:"😌 Anti-Stress",desc:"Magnésium + B5 + Glycine + Tryptophane",noms:["Magnésium","Vitamine B5 (pantothénique)","Glycine","Tryptophane"]},
    {nom:"🧬 Antioxydant Puissant",desc:"ALA + Glutathion + Vit C + E + Resvératrol + Quercétine",noms:["Ac. alpha-lipoïque","Glutathion","Vitamine C","Vitamine E (tocophérol)","Resvératrol","Quercétine"]},
    {nom:"🔗 Articulations",desc:"Ac. hyaluronique + Proline + Lysine + Vit C + Zinc",noms:["Ac. hyaluronique","Proline","Lysine","Vitamine C","Zinc"]},
    {nom:"🔋 Boost Énergie Matin",desc:"B1 + B2 + B3 + B6 + Magnésium + CoQ10",noms:["Vitamine B1 (thiamine)","Vitamine B2 (riboflavine)","Vitamine B3 (niacine)","Vitamine B6 (pyridoxine)","Magnésium","CoQ10"]},
    {nom:"❤️ Cardio & Circulation",desc:"Magnésium + K2 + CoQ10 + B9 + B12 + Taurine",noms:["Magnésium","Vitamine K2 (ménaquinone)","CoQ10","Vitamine B9 (folique)","Vitamine B12 (cobalamine)","Taurine"]},
    {nom:"🐟 Cerveau & Oméga-3",desc:"EPA + DHA + B12 + B9 + Magnésium",noms:["EPA (Oméga-3)","DHA (Oméga-3)","Vitamine B12 (cobalamine)","Vitamine B9 (folique)","Magnésium"]},
    {nom:"🧬 Cure Vitalité Cellulaire",desc:"A + B1 + B5 + B7 + E + Magnésium + Sélénium + Zinc",noms:["Vitamine A (rétinol)","Vitamine B1 (thiamine)","Vitamine B5 (pantothénique)","Vitamine B7 (biotine)","Vitamine E (tocophérol)","Magnésium","Sélénium","Zinc"]},
    {nom:"🌿 Détox Foie",desc:"Glutathion + Méthionine + Cystéine + NAC + Sélénium",noms:["Glutathion","Méthionine","Cystéine","NAC (N-acétyl cystéine)","Sélénium"]},
    {nom:"🛡️ Immunité Défenses",desc:"Vitamine C + D3 + Zinc + Sélénium + K2",noms:["Vitamine C","Vitamine D3 (cholécalciférol)","Zinc","Sélénium","Vitamine K2 (ménaquinone)"]},
    {nom:"🧠 Mémoire & Focus",desc:"B6 + B9 + B12 + Magnésium + Zinc",noms:["Vitamine B6 (pyridoxine)","Vitamine B9 (folique)","Vitamine B12 (cobalamine)","Magnésium","Zinc"]},
    {nom:"🦴 Os Solides",desc:"D3 + K2 + Calcium + Magnésium + B9",noms:["Vitamine D3 (cholécalciférol)","Vitamine K2 (ménaquinone)","Calcium","Magnésium","Vitamine B9 (folique)"]},
    {nom:"💪 Récupération Musculaire",desc:"Leucine + Isoleucine + Valine + Magnésium + B6",noms:["Leucine","Isoleucine","Valine","Magnésium","Vitamine B6 (pyridoxine)"]},
    {nom:"🌙 Sommeil Profond",desc:"Glycine + Magnésium + B6 + Tryptophane + Mélatonine",noms:["Glycine","Magnésium","Vitamine B6 (pyridoxine)","Tryptophane","Mélatonine"]},
    {nom:"⚖️ Thyroïde & Hormones",desc:"Iode + Sélénium + Zinc + Tyrosine",noms:["Iode","Sélénium","Zinc","Tyrosine"]}
  ];

  function renderMinItem(m, container){
    let div=document.createElement("div");
    div.className="min-item";
    div.style.cssText="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-bottom:1px solid var(--border);cursor:pointer;";
    div.onclick=function(){loadFreq(m.hz,m.duree,m.nom);openPlayer();};
    let left=document.createElement("div");
    left.innerHTML="<span style='font-weight:600;color:var(--text)'>"+(m.nom||"")+"</span>"+(m.action?"<br><span style='font-size:11px;color:var(--muted)'>"+m.action+"</span>":"");
    let right=document.createElement("div");
    right.style.cssText="display:flex;align-items:center;gap:6px;flex-shrink:0";
    let hz=document.createElement("span");
    hz.style.cssText="font-size:12px;color:var(--green);margin-right:4px";
    hz.textContent=m.hz+" "+m.duree+"m";
    let btnM=document.createElement("button");
    btnM.className="add-btn matin";btnM.textContent="+M";
    btnM.onclick=function(e){e.stopPropagation();addToPlaylist(m.hz,m.duree,m.nom,"matin");};
    let btnS=document.createElement("button");
    btnS.className="add-btn soir";btnS.textContent="+S";
    btnS.onclick=function(e){e.stopPropagation();addToPlaylist(m.hz,m.duree,m.nom,"soir");};
    right.appendChild(hz);right.appendChild(btnM);right.appendChild(btnS);
    div.appendChild(left);div.appendChild(right);
    container.appendChild(div);
  }

  function makeSection(label, items, renderFn){
    let sec=document.createElement("div");
    sec.style.cssText="margin-bottom:8px;border-radius:12px;border:1px solid var(--border);overflow:hidden";
    let hdr=document.createElement("div");
    hdr.style.cssText="font-size:14px;font-weight:700;color:var(--amber);padding:12px 14px;background:var(--s2);cursor:pointer;display:flex;justify-content:space-between;align-items:center;user-select:none";
    let arrow=document.createElement("span");
    arrow.textContent="▼";
    arrow.style.cssText="font-size:10px;transition:transform 0.3s;transform:rotate(-90deg)";
    let titleSpan=document.createElement("span");
    titleSpan.textContent=label+" ("+items.length+")";
    hdr.appendChild(titleSpan);hdr.appendChild(arrow);
    let body=document.createElement("div");
    body.style.cssText="max-height:0;overflow:hidden;transition:max-height 0.4s ease";
    hdr.onclick=function(){
      let open=body.style.maxHeight!=="0px"&&body.style.maxHeight!=="";
      body.style.maxHeight=open?"0":"3000px";
      arrow.style.transform=open?"rotate(-90deg)":"rotate(0deg)";
      if(!open&&!body._built){body._built=true;renderFn(body);}
    };
    items.forEach(function(){});// placeholder pour count
    sec.appendChild(hdr);sec.appendChild(body);
    return sec;
  }

  // Construire accordéon par catégorie
  CAT_ORDER.forEach(function(cat){
    if(cat==="Combo"){
      // Section Combos
      let sec=makeSection(CAT_LABELS["Combo"],COMBOS,function(body){
        COMBOS.forEach(function(combo){
          let card=document.createElement("div");
          card.style.cssText="padding:12px 14px;border-bottom:1px solid var(--border)";
          let titleRow=document.createElement("div");
          titleRow.style.cssText="display:flex;align-items:center;gap:6px;margin-bottom:4px";
          let title=document.createElement("div");
          title.style.cssText="font-weight:700;color:var(--text);flex:1";
          title.textContent=combo.nom;
          let btnM=document.createElement("button");
          btnM.style.cssText="padding:4px 8px;border-radius:6px;border:none;background:var(--amber);color:#000;font-size:10px;font-weight:600;cursor:pointer";
          btnM.textContent="+M";
          btnM.onclick=function(){let src=combo.nom;combo.noms.forEach(function(nom){let m=MINERAUX.find(function(x){return x.nom===nom;});if(m)addToPlaylist(m.hz,m.duree,m.nom,"matin",src);});};
          let btnS=document.createElement("button");
          btnS.style.cssText="padding:4px 8px;border-radius:6px;border:none;background:var(--green);color:#000;font-size:10px;font-weight:600;cursor:pointer";
          btnS.textContent="+S";
          btnS.onclick=function(){let src=combo.nom;combo.noms.forEach(function(nom){let m=MINERAUX.find(function(x){return x.nom===nom;});if(m)addToPlaylist(m.hz,m.duree,m.nom,"soir",src);});};
          titleRow.appendChild(title);titleRow.appendChild(btnM);titleRow.appendChild(btnS);
          let desc=document.createElement("div");
          desc.style.cssText="font-size:12px;color:var(--muted);margin-bottom:8px";
          desc.textContent=combo.desc;
          let freqRow=document.createElement("div");
          freqRow.style.cssText="display:flex;flex-wrap:wrap;gap:6px";
          combo.noms.forEach(function(nom){
            let m=MINERAUX.find(function(x){return x.nom===nom;});
            if(!m)return;
            let btn=document.createElement("button");
            btn.style.cssText="padding:4px 8px;border-radius:8px;border:1px solid var(--border);background:var(--s2);color:var(--green);font-size:11px;cursor:pointer";
            btn.textContent=nom.split(" (")[0]+" — "+m.hz+" Hz";
            btn.onclick=function(){loadFreq(m.hz,m.duree,m.nom);openPlayer();};
            freqRow.appendChild(btn);
          });
          card.appendChild(titleRow);card.appendChild(desc);card.appendChild(freqRow);
          body.appendChild(card);
        });
      });
      accordion.appendChild(sec);
      return;
    }
    let items=MINERAUX.filter(function(m){return m.cat===cat;}).sort(function(a,b){return a.nom.localeCompare(b.nom);});
    if(items.length===0)return;
    let label=(CAT_LABELS[cat]||cat)+" ("+items.length+")";
    let sec=document.createElement("div");
    sec.style.cssText="margin-bottom:8px;border-radius:12px;border:1px solid var(--border);overflow:hidden";
    let hdr=document.createElement("div");
    hdr.style.cssText="font-size:14px;font-weight:700;color:var(--amber);padding:12px 14px;background:var(--s2);cursor:pointer;display:flex;justify-content:space-between;align-items:center;user-select:none";
    let arrow=document.createElement("span");
    arrow.textContent="▼";arrow.style.cssText="font-size:10px;transition:transform 0.3s;transform:rotate(-90deg)";
    let titleSpan=document.createElement("span");
    titleSpan.textContent=label;
    hdr.appendChild(titleSpan);hdr.appendChild(arrow);
    let body=document.createElement("div");
    body.style.cssText="max-height:0;overflow:hidden;transition:max-height 0.4s ease";
    (function(items,body,arrow){
      hdr.onclick=function(){
        let open=body.style.maxHeight!=="0px"&&body.style.maxHeight!=="";
        body.style.maxHeight=open?"0":"3000px";
        arrow.style.transform=open?"rotate(-90deg)":"rotate(0deg)";
        if(!open&&!body._built){
          body._built=true;
          items.forEach(function(m){renderMinItem(m,body);});
        }
      };
    })(items,body,arrow);
    sec.appendChild(hdr);sec.appendChild(body);
    accordion.appendChild(sec);
  });
}

// Recherche globale dans tous les minéraux
function filterMinGlobal(query){
  let q=query.toLowerCase().trim();
  let accordion=document.getElementById("min-accordion");
  if(!accordion)return;
  if(!q){
    // Réafficher accordéon normal
    buildMineraux();
    return;
  }
  // Chercher dans tous les MINERAUX
  let results=MINERAUX.filter(function(m){
    return m.nom.toLowerCase().includes(q)||
           (m.action&&m.action.toLowerCase().includes(q));
  });
  accordion.innerHTML="";
  if(results.length===0){
    accordion.innerHTML="<div style='padding:20px;text-align:center;color:var(--muted)'>Aucun résultat pour '"+query+"'</div>";
    return;
  }
  results.sort(function(a,b){return a.nom.localeCompare(b.nom);});
  let container=document.createElement("div");
  container.style.cssText="border-radius:12px;border:1px solid var(--border);overflow:hidden";
  results.forEach(function(m){
    let div=document.createElement("div");
    div.className="min-item";
    div.style.cssText="display:flex;align-items:center;justify-content:space-between;padding:10px 12px;border-bottom:1px solid var(--border);cursor:pointer;";
    div.onclick=function(){loadFreq(m.hz,m.duree,m.nom);openPlayer();};
    let left=document.createElement("div");
    left.innerHTML="<span style='font-weight:600;color:var(--text)'>"+m.nom+"</span><br><span style='font-size:11px;color:var(--muted)'>"+(m.action||"")+"</span>";
    let right=document.createElement("div");
    right.style.cssText="display:flex;align-items:center;gap:6px;flex-shrink:0";
    let hz=document.createElement("span");
    hz.style.cssText="font-size:12px;color:var(--green)";
    hz.textContent=m.hz+" "+m.duree+"m";
    let btnM=document.createElement("button");
    btnM.className="add-btn matin";btnM.textContent="+M";
    btnM.onclick=function(e){e.stopPropagation();addToPlaylist(m.hz,m.duree,m.nom,"matin");};
    let btnS=document.createElement("button");
    btnS.className="add-btn soir";btnS.textContent="+S";
    btnS.onclick=function(e){e.stopPropagation();addToPlaylist(m.hz,m.duree,m.nom,"soir");};
    right.appendChild(hz);right.appendChild(btnM);right.appendChild(btnS);
    div.appendChild(left);div.appendChild(right);
    container.appendChild(div);
  });
  accordion.appendChild(container);
}

function buildProtocoles(){
  const listEl=document.getElementById("proto-list");
  let searchHTML='<div style="margin-bottom:12px;position:sticky;top:0;background:var(--bg);z-index:10;padding-top:4px"><input type="text" id="proto-search" placeholder="🔍 Chercher un protocole... (fatigue, stress, etc)" style="width:100%;padding:10px 12px;border-radius:10px;border:1px solid var(--border);background:var(--s2);color:var(--green);font-size:14px;font-family:\'Outfit\',sans-serif;outline:none" oninput="filterProtoList(this.value)"></div>';
  listEl.innerHTML=searchHTML;
  const SECTIONS=[
    {titre:"\u{1F9E0} Syst\u00e8me nerveux",noms:["Anti-stress biochimique","Anxiété Stress","Dépression légère","Mémoire Concentration","Réveil Vitalité matinale","Sommeil biochimique Lavoie","Sommeil profond"]},
    {titre:"\u{1F4AA} Corps physique",sous:[
      {sous_titre:"Articulations",noms:["Arthrite général","Traumatologie Fracture Entorse"]},
      {sous_titre:"Colonne & Dos",noms:["Dos Lombaires","Récupération musculaire Crampes"]},
      {sous_titre:"Cardiovasculaire",noms:["Circulation biochimique Lavoie","Circulation pelvienne","Circulation sanguine"]},
      {sous_titre:"Organes",noms:["Digestion Colon","Lymphe drainage","Reins support","Respiration Poumons"]},
      {sous_titre:"R\u00e9cup\u00e9ration",noms:["Énergie Performance physique","Récupération post-effort","Régénération tissulaire"]}
    ]},
    {titre:"\u{1F441} Yeux & Vision",noms:["Yeux Vision"]},
    {titre:"\u26A1 Vitalit\u00e9",noms:["Fatigue CAFL","Vitalité générale"]},
    {titre:"\u{1F33F} Bien-\u00eatre quotidien",noms:["Concentration mentale CAFL","Défenses naturelles Immunité","Détox assist","Détox profonde Lavoie","Foie support CAFL","Insomnie CAFL","Mémoire biochimique","Relaxation"]},
    {titre:"\u{1F52C} Prostate",noms:["Prostate général","Prostate hyperplasie","Prostatite"]},
    {titre:"\u{1F9EC} Protocoles THQV",noms:["Anxiété Burn-out THQV","Arthrose THQV","Asthme Allergies THQV","Cancer soutien THQV","Cognitif Alzheimer THQV","Dépression THQV","Diabète type 2 THQV","Fatigue Fibromyalgie THQV","Hypertension THQV","Insomnie THQV","Ostéoporose THQV","Thyroïde THQV"]},
    {titre:"\u{1F9EA} Routines Cure",noms:["Cure Immunité Express","Cure Peau Os Réparation","Cure Thyroïde Énergie"]},
    {titre:"\u{1F48A} Protocoles th\u00e9rapeutiques",reste:true}
  ];
  let done=new Set();
  function renderProto(p,pi){
    done.add(p.nom);
    const card=document.createElement("div");
    card.className="proto-card";
    const durS1=p.s1.reduce(function(a,x){return a+x.d;},0);
    const durS2=p.s2.reduce(function(a,x){return a+x.d;},0);
    let bodyHTML="";
    if(p.note)bodyHTML+="<div style='font-size:11px;color:var(--amber);margin-bottom:8px'>Note: "+p.note+"</div>";
    bodyHTML+="<div class='proto-section'>";
    bodyHTML+="<div style='display:flex;align-items:center;justify-content:space-between;margin-bottom:6px'>";
    bodyHTML+="<div class='proto-section-title s1' style='margin-bottom:0'>S1 \u2014 Nettoyage</div>";
    bodyHTML+="<button class='proto-freq-btn s1' style='font-size:11px' onclick='launchSequence("+pi+",\"s1\")'>Lancer S1</button>";
    bodyHTML+="</div><div class='proto-freq-row'>";
    p.s1.forEach(function(f){
      bodyHTML+="<div style='display:flex;flex-direction:column;gap:3px;align-items:center'><button class='proto-freq-btn s1' onclick='loadFreq("+f.hz+","+f.d+",\""+f.n+"\");openPlayer()'>"+ f.n+"<br><span style='font-size:11px'>"+f.hz+" Hz "+f.d+"m</span></button><button style='font-size:11px;padding:2px 6px;border-radius:5px;border:1px solid var(--green-border);background:var(--green-bg);color:var(--green);cursor:pointer' onclick='addFreqToPlaylist("+f.hz+","+f.d+",\""+f.n+"\",\"matin\",\"\",\""+p.nom+"\")'>+ PL</button></div>";
    });
    bodyHTML+="</div></div>";
    bodyHTML+="<div class='proto-section'>";
    bodyHTML+="<div style='display:flex;align-items:center;justify-content:space-between;margin-bottom:6px'>";
    bodyHTML+="<div class='proto-section-title s2' style='margin-bottom:0'>S2 \u2014 R\u00e9paration</div>";
    bodyHTML+="<button class='proto-freq-btn s2' style='font-size:11px' onclick='launchSequence("+pi+",\"s2\")'>Lancer S2</button>";
    bodyHTML+="</div><div class='proto-freq-row'>";
    p.s2.forEach(function(f){
      bodyHTML+="<div style='display:flex;flex-direction:column;gap:3px;align-items:center'><button class='proto-freq-btn s2' onclick='loadFreq("+f.hz+","+f.d+",\""+f.n+"\");openPlayer()'>"+ f.n+"<br><span style='font-size:11px'>"+f.hz+" Hz "+f.d+"m</span></button><button style='font-size:11px;padding:2px 6px;border-radius:5px;border:1px solid var(--green-border);background:var(--green-bg);color:var(--green);cursor:pointer' onclick='addFreqToPlaylist("+f.hz+","+f.d+",\""+f.n+"\",\"matin\",\"\",\""+p.nom+"\")'>+ PL</button></div>";
    });
    bodyHTML+="</div></div>";
    card.innerHTML="<div class='proto-header' onclick='toggleProto(this)'><span class='proto-title' style='color:var(--text)'>"+p.nom+"</span><span class='proto-badge'>S1:"+durS1+"m S2:"+durS2+"m</span></div><div class='proto-body'>"+bodyHTML+"</div>";
    return card;
  }
  SECTIONS.forEach(function(sec){
    let secEl=document.createElement("div");
    secEl.style.cssText="margin-bottom:8px;border-radius:12px;border:1px solid var(--border);overflow:hidden";
    let titreEl=document.createElement("div");
    titreEl.style.cssText="font-size:14px;font-weight:700;color:var(--amber);padding:12px 14px;background:var(--s2);cursor:pointer;display:flex;justify-content:space-between;align-items:center;user-select:none";
    let arrow=document.createElement("span");
    arrow.textContent="\u25BC";
    arrow.style.cssText="font-size:10px;transition:transform 0.3s;transform:rotate(-90deg)";
    let titreText=document.createElement("span");
    titreText.textContent=sec.titre;
    titreEl.appendChild(titreText);
    titreEl.appendChild(arrow);
    let contenuEl=document.createElement("div");
    contenuEl.style.cssText="max-height:0;opacity:0;overflow:hidden;transition:max-height 0.4s ease,opacity 0.3s ease,padding 0.3s ease;padding:0 10px";
    titreEl.addEventListener("click",function(){
      let open=contenuEl.style.maxHeight!=="0px"&&contenuEl.style.maxHeight!=="";
      contenuEl.style.maxHeight=open?"0":"2000px";
      contenuEl.style.opacity=open?"0":"1";
      contenuEl.style.padding=open?"0 10px":"10px";
      arrow.style.transform=open?"rotate(-90deg)":"rotate(0deg)";
    });
    secEl.appendChild(titreEl);
    if(sec.sous){
      sec.sous.forEach(function(sub){
        let subEl=document.createElement("div");
        subEl.style.cssText="margin-bottom:10px";
        let subTitreEl=document.createElement("div");
        subTitreEl.style.cssText="font-size:12px;font-weight:600;color:var(--muted);padding:4px 0 6px 4px";
        subTitreEl.textContent="\u2014 "+sub.sous_titre;
        subEl.appendChild(subTitreEl);
        sub.noms.forEach(function(nom){
          let idx=PROTOCOLES.findIndex(function(p){return p.nom===nom;});
          if(idx>=0)subEl.appendChild(renderProto(PROTOCOLES[idx],idx));
        });
        contenuEl.appendChild(subEl);
      });
    } else if(sec.reste){
      PROTOCOLES.forEach(function(p,i){
        if(!done.has(p.nom))contenuEl.appendChild(renderProto(p,i));
      });
    } else {
      sec.noms.forEach(function(nom){
        let idx=PROTOCOLES.findIndex(function(p){return p.nom===nom;});
        if(idx>=0)contenuEl.appendChild(renderProto(PROTOCOLES[idx],idx));
      });
    }
    secEl.appendChild(contenuEl);
    listEl.appendChild(secEl);
  });
}

function toggleProto(header){
  let body=header.nextElementSibling;
  body.classList.toggle("open");
  if(body.classList.contains("open")){
    setTimeout(function(){header.parentElement.scrollIntoView({behavior:"smooth",block:"center"});},100);
  }
}

function launchSequence(pi,type){
  function go(){
    const p=PROTOCOLES[pi];
    seqQueue=type==="s1"?p.s1.slice():p.s2.slice();
    seqType=type;seqProtoName=p.nom;seqIndex=0;openPlayer();
    playNextInSequence();
  }
  if(playing){
    showConfirm("Session en cours","Arrêter et lancer la séquence ?",function(){stopAudio();go();},{confirmLabel:'Arrêter & lancer',icon:'⚠️'});
    return;
  }
  go();
}

function playNextInSequence(){
  if(seqIndex>=seqQueue.length){
    stopAudio();
    if(seqType==="s1"){
      setTimeout(function(){
        showConfirm("S1 terminé","Voulez-vous continuer avec S2 ?",function(){
          let found = null;
          let isSymp = false;
          let pIdx = -1;
          
          for(let cat in SYMPTOMES){
            if(SYMPTOMES.hasOwnProperty(cat)){
              for(let i=0;i<SYMPTOMES[cat].length;i++){
                if(SYMPTOMES[cat][i].s === seqProtoName){
                  found = SYMPTOMES[cat][i];
                  isSymp = true;
                  break;
                }
              }
              if(found) break;
            }
          }
          
          if(!found){
            pIdx = PROTOCOLES.findIndex(function(p){ return p.nom === seqProtoName; });
            if(pIdx >= 0) found = PROTOCOLES[pIdx];
          }

          if(found && found.s2 && found.s2.length > 0){
            setTimeout(function(){
              if(isSymp){
                launchSympSequence(found.s2, 's2', found.s);
              } else {
                launchSequence(pIdx, 's2');
              }
            },1600);
            return;
          }
          customAlert("Information", "Nettoyage S1 terminé — "+seqProtoName+"\n\nBois de l'eau dans les 24-48h avant le S2.");
        },{confirmLabel:'Continuer S2',cancelLabel:'Arrêter',icon:'✅'});
      },300);
    }else if(seqType==="chakras"){
      setTimeout(function(){customAlert("Information", "Voyage au cœur des chakras terminé.\n\nPrenez un moment pour vous recentrer.");},300);
    }else if(seqType==="eveil"||seqType==="eveil_chakras"){
      setTimeout(function(){customAlert("Information", "Séquence Éveil terminée.\n\nRestez quelques instants dans cet état.");},300);
    }else if(seqType==="playlist"){
      setTimeout(function(){customAlert("Information", "Playlist terminée !\n\nBonne récupération.");},300);
    }else{
      setTimeout(function(){customAlert("Information", "Réparation S2 terminée — "+seqProtoName+"\n\nBonne récupération!");},300);
    }
    return;
  }
  const f=seqQueue[seqIndex];
  baseHz=f.hz;timerMin=f.d;
  if(seqType==="s1"||seqType==="s2"){
    currentLabel=seqProtoName+" : "+f.hz+" Hz";
  } else if(seqProtoName&&seqType!=="playlist"){
    currentLabel=seqProtoName+" : "+f.n;
  } else {
    currentLabel=f.n+" - "+f.hz+" Hz";
  }
  if(seqEveilDiffs.length>seqIndex)diff=seqEveilDiffs[seqIndex];
  setTimerChip(f.d);updateDisplays();updateVoyageBtn();
  startAudioSequence();
}

function startAudioSequence(){
  stopLiveTone();
  if(audioCtx){audioCtx.close();audioCtx=null;}
  if(timerInterval){clearInterval(timerInterval);timerInterval=null;}
  audioCtx=createAudioContext();
  const merger=audioCtx.createChannelMerger(2);
  gainNode=audioCtx.createGain();
  gainNode.gain.setValueAtTime(0,audioCtx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.25,audioCtx.currentTime+2);
  leftOsc=audioCtx.createOscillator();rightOsc=audioCtx.createOscillator();
  leftOsc.type="sine";rightOsc.type="sine";
  leftOsc.frequency.value=baseHz;rightOsc.frequency.value=baseHz+diff;
  const lg=audioCtx.createGain();const rg=audioCtx.createGain();
  lg.gain.value=1;rg.gain.value=1;
  leftOsc.connect(lg);rightOsc.connect(rg);
  lg.connect(merger,0,0);rg.connect(merger,0,1);
  merger.connect(gainNode);gainNode.connect(audioCtx.destination);
  leftOsc.start();rightOsc.start();
  playing=true;
  updateVoyageBtn();
  updateMediaSession();
  document.getElementById("play-btn").className="play-btn playing";
  document.getElementById("play-btn").innerHTML="<span class='pulse'></span>";
  let pb=document.getElementById("pause-btn");
  pb.style.display="flex";pb.innerHTML="\u23f8 Pause";
  pb.style.borderColor="var(--green-border)";pb.style.background="var(--green-bg)";pb.style.color="var(--green)";
  paused=false;
  secondsLeft=timerMin*60;updateTimerDisplay();
  timerInterval=setInterval(function(){
    secondsLeft--;saveSession();updateTimerDisplay();
    if(secondsLeft<=0){
      playEndChime();
      leftOsc.stop();rightOsc.stop();audioCtx.close();
      leftOsc=null;rightOsc=null;audioCtx=null;
      clearInterval(timerInterval);timerInterval=null;
      seqIndex++;
      setTimeout(playNextInSequence,800);
    }
  },1000);
}

function launchSympSequence(list,type,nom){
  function go(){
    seqQueue=list.map(function(item){return{n:item.hz+" Hz",hz:item.hz,d:item.d};});
    seqType=type;seqProtoName=nom;seqIndex=0;openPlayer();
    playNextInSequence();
  }
  if(playing){
    showConfirm("Session en cours","Arrêter et lancer la séquence ?",function(){stopAudio();go();},{confirmLabel:'Arrêter & lancer',icon:'⚠️'});
    return;
  }
  go();
}

function buildSymptomes(){
  const listEl=document.getElementById("symp-list");
  const tabsEl=document.getElementById("symp-cat-tabs");
  if(tabsEl)tabsEl.style.display="none";
  let searchHTML='<div style="margin-bottom:12px;position:sticky;top:0;background:var(--bg);z-index:10;padding-top:4px"><input type="text" id="symp-search" placeholder="🔍 Chercher un symptôme... (insomnie, migraine, etc)" style="width:100%;padding:10px 12px;border-radius:10px;border:1px solid var(--border);background:var(--s2);color:var(--green);font-size:14px;font-family:\'Outfit\',sans-serif;outline:none" oninput="filterSympList(this.value)"></div>';
  listEl.innerHTML=searchHTML;
  const ICONS={"Douleurs":"\uD83D\uDD34","Fatigue":"\u26A1","Sommeil":"\uD83C\uDF19","Mental":"\uD83E\uDDE0","Immunité":"\uD83D\uDEE1","Cognitif":"\uD83D\uDCA1"};
  Object.keys(SYMPTOMES).forEach(function(cat){
    let secEl=document.createElement("div");
    secEl.style.cssText="margin-bottom:8px;border-radius:12px;border:1px solid var(--border);overflow:hidden";
    let titreEl=document.createElement("div");
    titreEl.style.cssText="font-size:14px;font-weight:700;color:var(--amber);padding:12px 14px;background:var(--s2);cursor:pointer;display:flex;justify-content:space-between;align-items:center;user-select:none";
    let arrow=document.createElement("span");
    arrow.textContent="\u25BC";
    arrow.style.cssText="font-size:10px;transition:transform 0.3s;transform:rotate(-90deg)";
    let titreText=document.createElement("span");
    titreText.textContent=(ICONS[cat]||"")+"\u00A0"+cat;
    titreEl.appendChild(titreText);
    titreEl.appendChild(arrow);
    let contenuEl=document.createElement("div");
    contenuEl.style.cssText="max-height:0;opacity:0;overflow:hidden;transition:max-height 0.4s ease,opacity 0.3s ease,padding 0.3s ease;padding:0 10px";
    titreEl.addEventListener("click",function(){
      let open=contenuEl.style.maxHeight!=="0px"&&contenuEl.style.maxHeight!=="";
      contenuEl.style.maxHeight=open?"0":"2000px";
      contenuEl.style.opacity=open?"0":"1";
      contenuEl.style.padding=open?"0 10px":"10px";
      arrow.style.transform=open?"rotate(-90deg)":"rotate(0deg)";
    });
    SYMPTOMES[cat].slice().sort(function(a,b){return a.s.localeCompare(b.s);}).forEach(function(s){
      const card=document.createElement("div");
      card.className="proto-card";
      let bodyHTML="";
      bodyHTML+="<div class='proto-section'>";
      bodyHTML+="<div style='display:flex;align-items:center;justify-content:space-between;margin-bottom:6px'>";
      bodyHTML+="<div class='proto-section-title s1' style='margin-bottom:0'>S1 \u2014 Nettoyage</div>";
      bodyHTML+="<button class='proto-freq-btn s1 symp-launch-s1' style='font-size:11px'>Lancer S1</button>";
      bodyHTML+="</div><div class='proto-freq-row'>";
      s.s1.forEach(function(item){bodyHTML+="<span class='proto-freq-btn s1'>"+item.hz+" Hz<br><span style='font-size:11px;color:var(--muted)'>"+item.d+" min</span></span>";});
      bodyHTML+="</div></div>";
      bodyHTML+="<div class='proto-section' style='margin-top:8px'>";
      bodyHTML+="<div style='display:flex;align-items:center;justify-content:space-between;margin-bottom:6px'>";
      bodyHTML+="<div class='proto-section-title s2' style='margin-bottom:0'>S2 \u2014 R\u00e9paration</div>";
      bodyHTML+="<button class='proto-freq-btn s2 symp-launch-s2' style='font-size:11px'>Lancer S2</button>";
      bodyHTML+="</div><div class='proto-freq-row'>";
      (s.s2||[]).forEach(function(item){bodyHTML+="<span class='proto-freq-btn s2'>"+item.hz+" Hz<br><span style='font-size:11px;color:var(--muted)'>"+item.d+" min</span></span>";});
      bodyHTML+="</div></div>";
      card.innerHTML="<div class='proto-header' onclick='toggleProto(this)'><span class='proto-title'>"+s.s+"</span></div><div class='proto-body'>"+bodyHTML+"</div>";
      // Attach click handlers via JS to avoid JSON escaping issues
      let btns=card.querySelectorAll('.symp-launch-s1');
      if(btns.length>0)btns[0].onclick=function(){launchSympSequence(s.s1,'s1',s.s);};
      let btns2=card.querySelectorAll('.symp-launch-s2');
      if(btns2.length>0)btns2[0].onclick=function(){launchSympSequence(s.s2||[],'s2',s.s);};
      contenuEl.appendChild(card);
    });
    secEl.appendChild(titreEl);
    secEl.appendChild(contenuEl);
    listEl.appendChild(secEl);
  });
}

function showPage(id,btn){
  document.querySelectorAll(".page").forEach(function(p){p.classList.remove("active");});
  document.getElementById("page-"+id).classList.add("active");
  document.querySelectorAll(".nav-btn").forEach(function(b){b.classList.remove("active");});
  btn.classList.add("active");
  // Masquer le bandeau lecteur sur Binaural (déjà un bouton "Lancer l'écoute" sur cette page)
  let pbEl=document.getElementById("play-bar");
  if(pbEl)pbEl.style.display=(id==='binaural')?"none":"flex";
  // Build pathogènes lazily on first visit
  if(id==='pathogenes'){
    let pl=document.getElementById('path-list');
    if(pl&&pl.children.length===0)buildPathogenes();
  }
}

// ====== PAGE PATHOGENES ======
function buildPathogenes(){
  if(typeof PATHOGENES === 'undefined')return;
  const tabsEl=document.getElementById("path-cat-tabs");
  const listEl=document.getElementById("path-list");
  if(!tabsEl||!listEl)return;
  tabsEl.innerHTML='';listEl.innerHTML='';

  // Sous-catégories
  const SUBS={
    "Virus":["EBV (Epstein-Barr)","Herpès HSV1","Herpès HSV2","Herpès Zona","Grippe Influenza A","Grippe Influenza B"],
    "Bactéries":["Borrelia burgdorferi","Lyme complexe","Staphylocoque doré","Streptocoque","Helicobacter pylori","Chlamydia"],
    "Parasites":["Babesia","Parasites intestinaux"],
    "Champignons":["Candida albicans"]
  };
  const catKeys=Object.keys(SUBS);

  catKeys.forEach(function(subcat,i){
    const b=document.createElement("button");
    b.className="cat-tab"+(i===0?" active":"");
    b.textContent=subcat;
    b.onclick=function(){
      document.querySelectorAll("#path-cat-tabs .cat-tab").forEach(function(x){x.classList.remove("active");});
      b.classList.add("active");
      renderPath(subcat);
    };
    tabsEl.appendChild(b);
  });

  function renderPath(subcat){
    let names=SUBS[subcat]||[];
    let items=names.map(function(nm){
      return PATHOGENES.find(function(p){return p.nom===nm;});
    }).filter(Boolean);

    listEl.innerHTML='';
    let itemsContainer=document.createElement("div");
    items.forEach(function(m){
      const el=document.createElement("div");
      el.className="freq-item";
      let hz=m.hz,d=m.duree,nom=m.nom;
      let calcD=Math.round(Math.max(10,Math.min(45,6000/hz)));
      el.innerHTML="<div class='freq-item-left' style='flex:1'><span class='freq-item-name'>"+nom+"</span> <span class='freq-item-sub'>"+m.action+"</span></div><div class='freq-item-right'><div style='display:flex;flex-direction:row;align-items:center;gap:5px'><span class='freq-item-hz'>"+hz+" <span class='freq-item-dur'>"+calcD+"m</span></span><button style='font-size:12px;padding:5px 10px;border-radius:6px;border:1px solid var(--amber-border);background:var(--amber-bg);color:var(--amber);cursor:pointer;font-weight:600' onclick='event.stopPropagation();addFreqToPlaylist("+hz+","+calcD+",\""+nom+"\",\"matin\",\""+m.action+"\")'>+M</button><button style='font-size:12px;padding:5px 10px;border-radius:6px;border:1px solid var(--purple-border);background:var(--purple-bg);color:var(--purple);cursor:pointer;font-weight:600' onclick='event.stopPropagation();addFreqToPlaylist("+hz+","+calcD+",\""+nom+"\",\"soir\",\""+m.action+"\")'>+S</button></div></div>";
      el.onclick=function(){
        loadFreq(m.hz,calcD,m.nom);
        openPlayer();
        const bar=document.getElementById("sel-bar-path");
        bar.classList.add("show");
        document.getElementById("sel-bar-path-txt").textContent=m.nom+" — "+m.hz+" Hz — "+calcD+" min chargé";
      };
      itemsContainer.appendChild(el);
    });
    listEl.appendChild(itemsContainer);
  }
  renderPath(catKeys[0]);
}

// ====== RECHERCHE SYMPTÔME LIBRE ======
function doSympSearch(){
  let inp=document.getElementById("symp-search-input");
  let val=inp?inp.value:"";
  let sugEl=document.getElementById("symp-suggestions");
  if(!sugEl)return;
  if(!val||val.trim().length<2){sugEl.innerHTML='<div style="font-size:13px;color:var(--dim);padding:8px">Tape au moins 2 caract\u00e8res</div>';return;}

  // Normalisation : minuscules + suppression des accents (fievre = fievre)
  function norm(t){return String(t).toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");}

  // Distance de Levenshtein pour tolerance aux fautes
  function lev(a,b){
    if(a.length===0)return b.length;
    if(b.length===0)return a.length;
    let m=[];
    for(let i=0;i<=b.length;i++)m[i]=[i];
    for(let j=0;j<=a.length;j++)m[0][j]=j;
    for(i=1;i<=b.length;i++)for(j=1;j<=a.length;j++)
      m[i][j]=b[i-1]===a[j-1]?m[i-1][j-1]:Math.min(m[i-1][j-1]+1,m[i][j-1]+1,m[i-1][j]+1);
    return m[b.length][a.length];
  }

  // Tolerance par mot : 1 faute pour un mot court, 2 pour un mot long
  function tolOf(w){return w.length<=4?1:2;}

  // Meilleur score d'un mot tape contre un texte (0 = parfait)
  function scoreWord(texte,mot){
    if(texte.indexOf(mot)>=0)return 0;
    let mots=texte.split(/[^a-z0-9]+/);
    let best=99;
    for(let i=0;i<mots.length;i++){
      let m=mots[i];
      if(!m)continue;
      let d=lev(m,mot);
      if(d<best)best=d;
      // Le mot tape peut etre le debut d'un mot plus long (muscul -> musculaire)
      if(m.length>mot.length){
        let d2=lev(m.substring(0,mot.length),mot);
        if(d2<best)best=d2;
      }
    }
    return best;
  }

  let words=norm(val).split(/\s+/).filter(function(w){return w.length>=2;});
  if(words.length===0){sugEl.innerHTML='<div style="font-size:13px;color:var(--dim);padding:8px">Tape au moins 2 caract\u00e8res</div>';return;}

  // Score global : TOUS les mots doivent matcher (nom ou description)
  // Bonus si le match est dans le nom, retourne -1 si rejet
  function scoreItem(nom,desc){
    let nomN=norm(nom), descN=norm(desc||"");
    let total=0;
    for(let i=0;i<words.length;i++){
      let w=words[i];
      let dN=scoreWord(nomN,w);
      let dD=scoreWord(descN,w);
      let d=Math.min(dN,dD);
      if(d>tolOf(w))return -1;
      total+=d;
      if(dN>dD)total+=0.5; // legere penalite si trouve seulement dans la description
    }
    return total;
  }

  // Collecte des resultats pour une liste de mots donnee
  function collect(ws){
  let sc=function(nom,desc){let sv=words;words=ws;let r=scoreItem(nom,desc);words=sv;return r;};
  let results=[];

  // Chercher PARTOUT d'abord, trier apres
  MINERAUX.forEach(function(m){
    let d=sc(m.nom,m.action+' '+m.cat);
    if(d>=0){
      let calcD=Math.round(Math.max(10,Math.min(45,6000/m.hz)));
      results.push({nom:m.nom, hz:m.hz, d:calcD, action:m.action, src:"Min\u00e9ral", dist:d});
    }
  });

  PROTOCOLES.forEach(function(p){
    let d=sc(p.nom,p.note||'');
    if(d>=0){
      results.push({nom:p.nom, hz:p.s1[0]?p.s1[0].hz:0, d:p.s1[0]?p.s1[0].d:10, action:"Protocole: "+p.nom, src:"Protocole", dist:d});
    }
  });

  for(let cat in SYMPTOMES){
    SYMPTOMES[cat].forEach(function(s){
      let d=sc(s.s,cat);
      if(d>=0){
        results.push({nom:s.s, hz:s.s1[0]?s.s1[0].hz:0, d:s.s1[0]?s.s1[0].d:10, action:"Sympt\u00f4me: "+cat, src:"Sympt\u00f4me", dist:d, s1:s.s1, s2:s.s2||[]});
      }
    });
  }

  for(let cat2 in SYMPTOMES){
    let dc=sc(cat2,'');
    if(dc>=0&&!results.find(function(r){return r.nom===cat2;})){
      let firstS=SYMPTOMES[cat2][0];
      results.push({nom:cat2, hz:firstS?firstS.s1[0]?firstS.s1[0].hz:0:0, d:10, action:"Cat\u00e9gorie de sympt\u00f4mes", src:"Cat\u00e9gorie", dist:dc});
    }
  }

  return results;
  }

  let results=collect(words);

  // Repli : aucun resultat avec TOUS les mots -> chercher chaque mot separement
  if(results.length===0&&words.length>1){
    words.forEach(function(w){
      collect([w]).forEach(function(r){
        if(!results.find(function(x){return x.nom===r.nom&&x.src===r.src;}))results.push(r);
      });
    });
  }

  // Trier par pertinence (les Symptomes/Protocoles avant les Mineraux a score egal)
  let srcOrder={"Sympt\u00f4me":0,"Protocole":1,"Cat\u00e9gorie":2,"Min\u00e9ral":3};
  results.sort(function(a,b){
    if(a.dist!==b.dist)return a.dist-b.dist;
    return (srcOrder[a.src]||9)-(srcOrder[b.src]||9);
  });
  results=results.slice(0,8);

  if(results.length===0){
    sugEl.innerHTML='<div style="font-size:13px;color:var(--dim);padding:12px;text-align:center">Aucun r\u00e9sultat pour "<b>'+val+'</b>"</div>';
    return;
  }

  let html='<div style="font-size:11px;color:var(--muted);margin-bottom:6px">'+results.length+' r\u00e9sultat(s) pour "'+val+'"</div>';
  // Boutons pour tout ajouter a Matin ou Soir
  html+='<div style="display:flex;gap:8px;margin-bottom:8px">'
    +'<button onclick="addAllToPlaylist(\'matin\')" style="flex:1;padding:8px;border-radius:8px;border:1px solid var(--amber-border);background:var(--amber-bg);color:var(--amber);font-size:12px;font-weight:600;cursor:pointer">\u2600\ufe0f Tout \u2192 Matin</button>'
    +'<button onclick="addAllToPlaylist(\'soir\')" style="flex:1;padding:8px;border-radius:8px;border:1px solid var(--purple-border);background:var(--purple-bg);color:var(--purple);font-size:12px;font-weight:600;cursor:pointer">\ud83c\udf19 Tout \u2192 Soir</button>'
    +'</div>';
  // Stocker les resultats pour addAllToPlaylist
  window._lastResults=results;
  results.forEach(function(r,ri){
    html+='<button class="chip" onclick="playSearchResult('+ri+')" style="flex-direction:row;gap:6px;padding:8px 12px;font-size:12px">'
      +'<span style="font-size:10px;color:var(--muted);margin-right:2px">['+r.src+']</span>'
      +'<span style="color:var(--green);font-weight:600">'+r.nom+'</span>'
      +' <span style="color:var(--blue);font-family:JetBrains Mono">'+r.hz+' Hz</span>'
      +' <span style="font-size:10px;color:var(--muted)">'+r.d+'m</span>'
      +'</button>';
  });
  sugEl.innerHTML=html;
  // Scroll vers les resultats
  setTimeout(function(){sugEl.scrollIntoView({behavior:'smooth',block:'nearest'});},50);
}
function playSearchResult(ri){
  let r=window._lastResults&&window._lastResults[ri];
  if(!r)return;
  closeSympSearch();
  if(r.src==="Symptôme"&&r.s1&&r.s1.length>0){
    launchSympSequence(r.s1,'s1',r.nom);
  }else{
    loadFreq(r.hz,r.d,r.nom);
    openPlayer();
  }
}
function closeSympSearch(){
  document.getElementById("symp-suggestions").innerHTML="";
}
function addAllToPlaylist(slot){
  let r=window._lastResults;
  if(!r||r.length===0){customAlert("Information", "Fais d'abord une recherche");return;}
  let nomSlot=slot==="matin"?"☀️ Matin":"🌙 Soir";
  // Analyser le type de fréquences pour suggérer matin ou soir
  let nbEnergie=0,nbCalmant=0;
  let motsEnergie=["énergie","vitalité","réveil","dopamine","thyroïde","cortisol","performance","focus","éveil","stimulation","motivation"];
  let motsCalmant=["sommeil","détente","calme","relaxation","gaba","mélatonine","apaisement","stress","anxiété","insomnie","repos"];
  r.forEach(function(item){
    let t=(item.nom+" "+item.action).toLowerCase();
    motsEnergie.forEach(function(m){if(t.includes(m))nbEnergie++;});
    motsCalmant.forEach(function(m){if(t.includes(m))nbCalmant++;});
  });
  let conseil="";
  if(nbEnergie>nbCalmant)conseil="💡 Conseil : ces fréquences sont plutôt <b>énergisantes</b> → idéal le <b>☀️ matin</b>";
  else if(nbCalmant>nbEnergie)conseil="💡 Conseil : ces fréquences sont plutôt <b>calmantes</b> → idéal le <b>🌙 soir</b>";
  else conseil="💡 Conseil : fréquences mixtes → adapté matin ou soir";

  let html='<div style="padding:4px 0">';
  html+='<div style="font-size:15px;font-weight:600;color:slot==="matin"?var(--amber):var(--purple);margin-bottom:10px">Ajouter à '+nomSlot+' ?</div>';
  html+=conseil;
  html+='<div style="font-size:12px;color:var(--muted);margin:10px 0 6px">'+r.length+' fréquence(s) :</div>';
  html+='<div style="max-height:150px;overflow-y:auto;margin-bottom:12px">';
  r.forEach(function(item){
    html+='<div style="font-size:12px;color:var(--text);padding:3px 0;border-bottom:1px solid var(--border)">'
      +'<span style="color:var(--blue);font-family:JetBrains Mono;font-size:11px">'+item.hz+' Hz</span>'
      +' <span>'+item.nom+'</span>'
      +' <span style="color:var(--muted);font-size:11px">'+item.d+'m</span>'
      +'</div>';
  });
  html+='</div>';
  html+='<div style="display:flex;gap:8px">';
  html+='<button onclick="confirmAddToPlaylist(\''+slot+'\')" style="flex:1;padding:12px;border-radius:10px;border:1px solid var(--green-border);background:var(--green-bg);color:var(--green);font-size:14px;font-weight:600;cursor:pointer">✅ Ajouter</button>';
  html+='<button onclick="closePopup()" style="flex:1;padding:12px;border-radius:10px;border:1px solid var(--border);background:var(--s2);color:var(--muted);font-size:14px;cursor:pointer">Annuler</button>';
  html+='</div></div>';

  showPopup(html);
}
function confirmAddToPlaylist(slot){
  let r=window._lastResults;
  if(!r)return;
  r.forEach(function(item){
    playlists[slot].push({hz:item.hz, d:item.d, nom:item.nom, action:item.action||""});
  });
  savePlaylist(slot);
  renderPlaylist(slot);
  closePopup();
  let nomSlot=slot==="matin"?"Matin ☀️":"Soir 🌙";
  document.getElementById("symp-suggestions").innerHTML='<div style="font-size:13px;color:var(--green);text-align:center;padding:12px">✅ '+r.length+' fréquences ajoutées à '+nomSlot+'</div>';
  setTimeout(function(){document.getElementById("symp-suggestions").innerHTML="";},3000);
}
function showPopup(contenu){
  let p=document.getElementById("ft-popup");
  if(!p){
    p=document.createElement("div");
    p.id="ft-popup";
    p.style.cssText="position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,0.7);z-index:500;display:flex;align-items:center;justify-content:center;padding:24px;animation:fadeIn 0.2s;backdrop-filter:blur(4px)";
    document.body.appendChild(p);
  }
  p.innerHTML='<div style="max-width:400px;width:100%;background:var(--s1);border:1px solid var(--border);border-radius:20px;padding:20px;box-shadow:0 20px 60px rgba(0,0,0,0.5);animation:modalIn 0.25s">'+contenu+'</div>';
  p.style.display="flex";
}
function closePopup(){
  let p=document.getElementById("ft-popup");
  if(p)p.style.display="none";
}

// SEARCH FUNCTIONS
function filterMineraux() {
  let term = document.getElementById('search-mineraux').value.toLowerCase();
  let items = document.querySelectorAll('#min-list .freq-item');
  items.forEach(function(item) {
    let text = item.textContent.toLowerCase();
    item.style.display = text.includes(term) ? 'flex' : 'none';
  });
}

function filterProtocoles() {
  let term = document.getElementById('search-protocoles').value.toLowerCase();
  let cards = document.querySelectorAll('#proto-list .proto-card');
  cards.forEach(function(card) {
    let text = card.textContent.toLowerCase();
    card.style.display = text.includes(term) ? 'block' : 'none';
  });
  // Afficher aussi les sections parents si elle contiennent des résultats
  let sections = document.querySelectorAll('#proto-list > div');
  sections.forEach(function(sec) {
    let hasVisible = false;
    let cards = sec.querySelectorAll('.proto-card');
    cards.forEach(function(card) {
      if(card.style.display !== 'none') hasVisible = true;
    });
    sec.style.display = hasVisible ? 'block' : 'none';
  });
}

function filterSymptomes() {
  let term = document.getElementById('search-symptomes').value.toLowerCase();
  let cards = document.querySelectorAll('#symp-list .proto-card');
  cards.forEach(function(card) {
    let text = card.textContent.toLowerCase();
    card.style.display = text.includes(term) ? 'block' : 'none';
  });
  // Afficher aussi les sections parents si elle contiennent des résultats
  let sections = document.querySelectorAll('#symp-list > div');
  sections.forEach(function(sec) {
    let hasVisible = false;
    let cards = sec.querySelectorAll('.proto-card');
    cards.forEach(function(card) {
      if(card.style.display !== 'none') hasVisible = true;
    });
    sec.style.display = hasVisible ? 'block' : 'none';
  });
}

init();
checkFirstVisit();
if('serviceWorker' in navigator){
  navigator.serviceWorker.register('sw.js');
}

// --- DETECTION LIEN PARTAGE ---
(function(){
  let params=new URLSearchParams(window.location.search);
  let p=params.get('p');
  let f=params.get('f');
  if(p){
    let parts=p.split('_');
    let slot=parts[0];
    let hzList=parts.slice(1).map(Number);
    if(slot==='matin'||slot==='soir'){
      playlists[slot]=hzList.map(function(hz,idx){
        return {hz:hz, d:Math.round(Math.max(10,Math.min(45,6000/hz))), nom:hz+' Hz'};
      });
      savePlaylist(slot);
      renderPlaylist(slot);
    }
  }
  if(f){
    let hzList2=f.split(',').map(Number);
    let slot2='partage';
    playlists[slot2]=hzList2.map(function(hz){
      return {hz:hz, d:Math.round(Math.max(10,Math.min(45,6000/hz))), nom:hz+' Hz'};
    });
    savePlaylist(slot2);
    renderPlaylist(slot2);
    // Afficher la carte partagée et aller sur l'onglet Perso
    let card=document.getElementById('playlist-card-partage');
    if(card)card.style.display='block';
    let persoBtn=document.querySelectorAll('.nav-btn')[1];
    if(persoBtn)showPage('perso',persoBtn);
  }
})();

function openPlayer(){
  let p=document.getElementById('page-player');
  if(!p)return;
  p.style.display='flex';
  updatePlayerDisplay();
}
function closePlayer(){
  let p=document.getElementById('page-player');
  if(p)p.style.display='none';
}
function updatePlayerDisplay(){
  let pgPlayer=document.getElementById('page-player');
  if(!pgPlayer||pgPlayer.style.display==='none')return;

  // ===== Déterminer le type de séquence et le badge =====
  let badgeText = 'SESSION';
  let badgeColor = 'green';  // green | amber | purple | blue
  let seqInfo = '';
  let protoName = seqProtoName || currentLabel || '—';

  if (seqType === 'playlist') {
    if (seqProtoName === 'Playlist Matin') {
      badgeText = 'PLAYLIST MATIN';
      badgeColor = 'amber';
    } else if (seqProtoName === 'Playlist Soir') {
      badgeText = 'PLAYLIST SOIR';
      badgeColor = 'purple';
    } else {
      badgeText = 'PLAYLIST';
      badgeColor = 'green';
    }
  } else if (seqType === 's1') {
    badgeText = 'PROTOCOLE · S1 NETTOYAGE';
    badgeColor = 'amber';
  } else if (seqType === 's2') {
    badgeText = 'PROTOCOLE · S2 RÉPARATION';
    badgeColor = 'green';
  } else if (seqType === 'chakras') {
    badgeText = 'VOYAGE DES CHAKRAS';
    badgeColor = 'purple';
  } else if (seqType === 'eveil') {
    badgeText = 'SÉQUENCE ÉVEIL';
    badgeColor = 'amber';
  } else if (seqType === 'eveil_chakras') {
    badgeText = 'VOYAGE ÉVEIL · GAMMA 40';
    badgeColor = 'amber';
  } else if (seqType === 'libre' || !seqType) {
    badgeText = 'FRÉQUENCE LIBRE';
    badgeColor = 'green';
  }

  // Position dans la séquence
  if (seqQueue && seqQueue.length > 0) {
    seqInfo = 'Fréquence ' + (seqIndex + 1) + ' / ' + seqQueue.length;
  }

  // ===== Mettre à jour le badge =====
  let badgeEl = document.getElementById('player-seq-badge');
  if (badgeEl) {
    badgeEl.textContent = badgeText;
    let colorMap = {
      green:   {bg: 'var(--green-bg)',   color: 'var(--green)',   border: 'var(--green-border)'},
      amber:   {bg: 'var(--amber-bg)',   color: 'var(--amber)',   border: 'var(--amber-border)'},
      purple:  {bg: 'var(--purple-bg)',  color: 'var(--purple)',  border: 'var(--purple-border)'},
      blue:    {bg: 'var(--blue-bg)',    color: 'var(--blue)',    border: 'var(--blue-border)'}
    };
    let c = colorMap[badgeColor] || colorMap.green;
    badgeEl.style.background = c.bg;
    badgeEl.style.color = c.color;
    badgeEl.style.borderColor = c.border;
  }

  // ===== Titre = source du combo/protocole si disponible, sinon nom séquence =====
  let cur2 = (seqQueue && seqQueue.length > 0 && seqIndex < seqQueue.length) ? seqQueue[seqIndex] : null;
  let displayTitle = (cur2 && cur2.source) ? cur2.source : protoName;
  document.getElementById('player-proto-name').textContent = displayTitle;

  // ===== Sous-titre = position =====
  let seqInfoEl = document.getElementById('player-seq-info');
  if (seqInfoEl) seqInfoEl.textContent = seqInfo;

  // ===== Label compact en haut (S1/S2/etc.) =====
  let seqLbl = '';
  if (seqType === 's1') seqLbl = 'S1';
  else if (seqType === 's2') seqLbl = 'S2';
  else if (seqType === 'playlist') seqLbl = seqProtoName;
  else seqLbl = seqType || '';
  document.getElementById('player-seq-label').textContent = seqLbl;

  // ===== Fréquence en cours (nom + détails) =====
  if (seqQueue && seqQueue.length > 0 && seqIndex < seqQueue.length) {
    let cur = seqQueue[seqIndex];
    // Le nom de la fréquence en cours (le protocole/symptôme/minéral spécifique)
    // Si la fréquence a une source (combo/protocole), l'afficher comme titre
    let curNom = cur.n || cur.nom || '—';
    let curSource = cur.source || '';
    if(curSource){
      document.getElementById('player-proto-name').textContent = curSource;
      document.getElementById('player-freq-name').textContent = curNom;
    } else {
      document.getElementById('player-freq-name').textContent = curNom;
    }
    // Détails : Hz + durée + action
    let details = '';
    if (cur.hz) details += cur.hz + ' Hz';
    if (cur.d) details += (details ? ' · ' : '') + cur.d + ' min';
    if (cur.action) details += (details ? ' · ' : '') + cur.action;
    document.getElementById('player-freq-action').textContent = details || '—';
    let pos = (seqIndex + 1) + ' / ' + seqQueue.length;
    document.getElementById('player-progress-label').textContent = pos;
    let pct = ((seqIndex) / seqQueue.length) * 100;
    document.getElementById('player-progress-bar').style.width = pct + '%';
  } else {
    // Mode fréquence libre (pas de séquence)
    document.getElementById('player-freq-name').textContent = currentLabel || '—';
    let details = '';
    if (baseHz) details += baseHz + ' Hz';
    if (timerMin) details += (details ? ' · ' : '') + timerMin + ' min';
    document.getElementById('player-freq-action').textContent = details || '—';
    document.getElementById('player-progress-label').textContent = '';
  }
  // Timer + analog clock
  let s=(playing||paused)?secondsLeft:timerMin*60;
  let total=timerMin*60||600;
  let m=Math.floor(s/60),sec=s%60;
  let timeStr=String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0');
  // Clock text
  let ct=document.getElementById('player-clock-text');
  if(ct)ct.textContent=timeStr;
  // Arc progress (circumference 464.9)
  let arc=document.getElementById('player-clock-arc');
  if(arc){let pct=s/total;arc.style.strokeDashoffset=(464.9*(1-pct)).toFixed(1);}
  // Minute hand (based on elapsed time)
  let elapsed=total-s;
  let elMin=Math.floor(elapsed/60);let elSec=elapsed%60;
  let minHand=document.getElementById('player-clock-min');
  if(minHand){let minAngle=(elMin%60)/60*360;let mr=minAngle*Math.PI/180;let mx=80+58*Math.sin(mr);let my=80-58*Math.cos(mr);minHand.setAttribute('x2',mx.toFixed(1));minHand.setAttribute('y2',my.toFixed(1));}
  // Second hand
  let secHand=document.getElementById('player-clock-sec');
  if(secHand){let secAngle=elSec/60*360;let sr=secAngle*Math.PI/180;let sx=80+62*Math.sin(sr);let sy=80-62*Math.cos(sr);secHand.setAttribute('x2',sx.toFixed(1));secHand.setAttribute('y2',sy.toFixed(1));}
  // Pause btn
  let pb=document.getElementById('player-pause-btn');
  if(pb)pb.textContent=paused?'▶ Reprendre':'⏸ Pause';
}

// ============================================================
// THÈME CLAIR / SOMBRE
// ============================================================
function toggleTheme() {
  const root = document.documentElement;
  const current = root.getAttribute('data-theme');
  const next = current === 'light' ? 'dark' : 'light';
  if (next === 'dark') {
    root.removeAttribute('data-theme');
  } else {
    root.setAttribute('data-theme', 'light');
  }
  try { localStorage.setItem('ft_theme', next); } catch(e) {}
  // Mettre à jour la meta theme-color
  const meta = document.getElementById('meta-theme-color');
  if (meta) meta.content = next === 'light' ? '#f5f7fb' : '#080b12';
}

// ============================================================
// MENU "PLUS" (nav déroulant)
// ============================================================
function toggleMoreMenu(e) {
  if (e) e.stopPropagation();
  const menu = document.getElementById('more-menu');
  if (menu) menu.classList.toggle('open');
}
function closeMoreMenu() {
  const menu = document.getElementById('more-menu');
  if (menu) menu.classList.remove('open');
}
// Fermer le menu si on clique ailleurs
document.addEventListener('click', function(e) {
  const menu = document.getElementById('more-menu');
  const btn = e.target.closest('.nav-btn-more');
  if (menu && menu.classList.contains('open') && !btn && !e.target.closest('.more-menu')) {
    menu.classList.remove('open');
  }
});

// ============================================================
// VOLUME MASTER — slider global
// ============================================================
let masterVolume = 0.25; // 0 à 1

// Synchronise tous les sliders de volume (player + panneau flottant)
function syncVolumeUI() {
  const pct = Math.round(masterVolume * 100);
  const sliders = [
    {slider: document.getElementById('volume-slider'),     label: document.getElementById('volume-value')},
    {slider: document.getElementById('volume-slider-bar'), label: document.getElementById('volume-value-bar')}
  ];
  sliders.forEach(function(s) {
    if (s.slider && s.slider.value != pct) s.slider.value = pct;
    if (s.slider) s.slider.style.setProperty('--vol-pct', pct + '%');  // gradient track
    if (s.label) s.label.textContent = pct + '%';
  });
  // Mettre à jour l'icône du bouton volume dans la play-bar (mute si 0%)
  const volBtn = document.getElementById('volume-btn');
  if (volBtn) {
    const svg = volBtn.querySelector('svg');
    if (svg) {
      if (masterVolume === 0) {
        svg.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>';
      } else {
        svg.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>';
      }
    }
  }
  // Mettre à jour aussi le bouton header-volume (en haut à droite)
  const headerVolBtn = document.getElementById('header-volume-btn');
  if (headerVolBtn) {
    if (masterVolume === 0) {
      headerVolBtn.classList.add('muted');
      const svg = headerVolBtn.querySelector('svg');
      if (svg) svg.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="23" y1="9" x2="17" y2="15"/><line x1="17" y1="9" x2="23" y2="15"/>';
    } else {
      headerVolBtn.classList.remove('muted');
      const svg = headerVolBtn.querySelector('svg');
      if (svg) svg.innerHTML = '<polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/>';
    }
  }
}

// Ouvrir/fermer le panneau volume flottant
function toggleVolumePanel(e) {
  if (e) e.stopPropagation();
  const panel = document.getElementById('volume-panel');
  if (panel) {
    const isOpen = panel.style.display !== 'none';
    panel.style.display = isOpen ? 'none' : 'block';
    if (!isOpen) syncVolumeUI();
  }
}

// Fermer le panneau si on clique ailleurs
document.addEventListener('click', function(e) {
  const panel = document.getElementById('volume-panel');
  const volBtn = document.getElementById('volume-btn');
  const headerVolBtn = document.getElementById('header-volume-btn');
  if (panel && panel.style.display !== 'none' &&
      !panel.contains(e.target) &&
      !(volBtn && volBtn.contains(e.target)) &&
      !(headerVolBtn && headerVolBtn.contains(e.target))) {
    panel.style.display = 'none';
  }
});

function setupVolumeSlider() {
  // Charger la valeur sauvegardée
  try {
    const saved = localStorage.getItem('ft_volume');
    if (saved !== null) {
      masterVolume = parseFloat(saved);
    }
  } catch(e) {}
  syncVolumeUI();

  // Attacher les listeners sur les deux sliders
  const sliderIds = ['volume-slider', 'volume-slider-bar'];
  sliderIds.forEach(function(id) {
    const slider = document.getElementById(id);
    if (!slider) return;

    // Handler commun
    function onVolumeChange() {
      masterVolume = parseInt(slider.value) / 100;
      // Appliquer au gainNode actuel si on est en train de jouer
      if (gainNode && audioCtx) {
        try { gainNode.gain.setTargetAtTime(masterVolume, audioCtx.currentTime, 0.05); } catch(e) {}
      }
      try { localStorage.setItem('ft_volume', masterVolume.toString()); } catch(e) {}
      syncVolumeUI();
    }

    // Écouter plusieurs événements pour compatibilité maximale
    slider.addEventListener('input', onVolumeChange);
    slider.addEventListener('change', onVolumeChange);

    // Empêcher le click-outside handler de fermer le panneau pendant l'interaction
    slider.addEventListener('pointerdown', function(e) { e.stopPropagation(); });
    slider.addEventListener('mousedown', function(e) { e.stopPropagation(); });
    slider.addEventListener('touchstart', function(e) { e.stopPropagation(); }, {passive: true});
  });
}

// Boutons +/- pour ajuster le volume (alternative au slider pour navigateurs difficiles)
function adjustVolume(delta) {
  let pct = Math.round(masterVolume * 100) + delta;
  pct = Math.max(0, Math.min(100, pct));
  masterVolume = pct / 100;
  if (gainNode && audioCtx) {
    try { gainNode.gain.setTargetAtTime(masterVolume, audioCtx.currentTime, 0.05); } catch(e) {}
  }
  try { localStorage.setItem('ft_volume', masterVolume.toString()); } catch(e) {}
  syncVolumeUI();
}

// ============================================================
// HALO PULSANT — Option B
// ============================================================
function startHalo() {
  const halo = document.getElementById('player-halo');
  if (!halo) return;
  // Période = 1 / fréquence du battement (ex: 1.2 Hz → 0.833s)
  const period = diff > 0 ? (1 / diff) : 0.83;
  halo.style.setProperty('--halo-period', period.toFixed(3) + 's');
  halo.classList.add('active');
}
function stopHalo() {
  const halo = document.getElementById('player-halo');
  if (halo) halo.classList.remove('active');
}

// ============================================================
// ANIMATION FREQ-ROW
// ============================================================
function updateFreqRowAnim() {
  const row = document.querySelector('.freq-row');
  if (!row) return;
  if (playing) row.classList.add('playing');
  else row.classList.remove('playing');
}

// ============================================================
// HISTORIQUE DES SESSIONS
// ============================================================
let history = [];
function loadHistory() {
  try {
    const d = localStorage.getItem('ft_history');
    if (d) history = JSON.parse(d);
  } catch(e) { history = []; }
}
function saveHistory() {
  try { localStorage.setItem('ft_history', JSON.stringify(history)); } catch(e) {}
}
function addToHistory(label, hz, durationMin, type) {
  const entry = {
    label: label || (hz + ' Hz'),
    hz: hz || baseHz,
    duration: durationMin || timerMin,
    type: type || seqType || 'libre',
    timestamp: Date.now()
  };
  history.unshift(entry);
  // Garder max 100 entrées
  if (history.length > 100) history = history.slice(0, 100);
  saveHistory();
}
function renderHistory() {
  const list = document.getElementById('history-list');
  if (!list) return;
  if (history.length === 0) {
    list.innerHTML = '<div class="history-empty">Aucune session pour le moment.<br>Lance une fréquence pour commencer.</div>';
  } else {
    let html = '';
    history.slice(0, 30).forEach(function(e) {
      const d = new Date(e.timestamp);
      const dateStr = d.toLocaleDateString('fr-FR', {day:'2-digit', month:'short'}) + ' ' +
                      d.toLocaleTimeString('fr-FR', {hour:'2-digit', minute:'2-digit'});
      const typeBadge = e.type ? '<span class="badge badge-blue" style="margin-right:6px">' + e.type + '</span>' : '';
      html += '<div class="history-item">' +
                '<div>' + typeBadge +
                  '<span style="color:var(--text);font-weight:500">' + (e.label || '—') + '</span>' +
                  ' <span class="history-freq">' + e.hz + ' Hz</span>' +
                  ' <span style="color:var(--muted);font-size:11px">· ' + e.duration + ' min</span>' +
                '</div>' +
                '<div class="history-date">' + dateStr + '</div>' +
              '</div>';
    });
    list.innerHTML = html;
  }
  // Mettre à jour les stats
  calcStats();
}
function calcStats() {
  const total = history.length;
  let totalMin = 0;
  const freqCount = {};
  const days = new Set();
  history.forEach(function(e) {
    totalMin += e.duration || 0;
    const key = Math.round(e.hz);
    freqCount[key] = (freqCount[key] || 0) + 1;
    const d = new Date(e.timestamp);
    days.add(d.toDateString());
  });
  // Top fréquence
  let topFreq = '—';
  let topCount = 0;
  for (let f in freqCount) {
    if (freqCount[f] > topCount) { topCount = freqCount[f]; topFreq = f + ' Hz'; }
  }
  // Streak (jours consécutifs depuis aujourd'hui)
  const today = new Date().toDateString();
  let streak = 0;
  let checkDay = new Date();
  while (true) {
    if (days.has(checkDay.toDateString())) {
      streak++;
      checkDay.setDate(checkDay.getDate() - 1);
    } else break;
  }
  const elTotal = document.getElementById('stat-total');
  const elMin = document.getElementById('stat-minutes');
  const elTop = document.getElementById('stat-topfreq');
  const elStreak = document.getElementById('stat-streak');
  if (elTotal) elTotal.textContent = total;
  if (elMin) elMin.textContent = totalMin >= 60 ? (Math.floor(totalMin/60) + 'h' + (totalMin%60) + 'm') : totalMin + 'm';
  if (elTop) elTop.textContent = topFreq;
  if (elStreak) elStreak.textContent = streak;
}
function clearHistory() {
  showConfirm('Vider l\'historique', 'Supprimer toutes les ' + history.length + ' sessions ?', function() {
    history = [];
    saveHistory();
    renderHistory();
  }, {confirmLabel: 'Vider', icon: '🗑️', confirmColor: 'amber'});
}

// ============================================================
// RECHERCHE LIVE — debounce 250ms sur symptômes
// ============================================================
let _sympSearchTimer = null;
function setupLiveSearch() {
  // Recherche symptômes live (page symptômes)
  const sympInput = document.getElementById('symp-search-input');
  if (sympInput) {
    sympInput.addEventListener('input', function() {
      clearTimeout(_sympSearchTimer);
      _sympSearchTimer = setTimeout(function() {
        if (sympInput.value.trim().length >= 2) {
          doSympSearch();
        }
      }, 250);
    });
  }
}

// ============================================================
// EXPORT / IMPORT JSON (sauvegarde globale)
// ============================================================
function exportUserData() {
  const data = {
    version: 1,
    exportedAt: new Date().toISOString(),
    playlists: {
      matin: playlists.matin || [],
      soir: playlists.soir || []
    },
    savedPlaylists: savedPlaylists || {},
    favs: favs || [],
    history: history || []
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: 'application/json'});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'mes-frequences-' + new Date().toISOString().slice(0,10) + '.json';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  customToast('💾 Données exportées');
}
function importUserData(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (!data || typeof data !== 'object') throw new Error('Format invalide');
      showConfirm('Importer', 'Remplacer tes données actuelles par celles du fichier ? (playlists, favoris, historique)', function() {
        if (data.playlists) {
          if (data.playlists.matin) { playlists.matin = data.playlists.matin; savePlaylist('matin'); renderPlaylist('matin'); }
          if (data.playlists.soir) { playlists.soir = data.playlists.soir; savePlaylist('soir'); renderPlaylist('soir'); }
        }
        if (data.savedPlaylists) { savedPlaylists = data.savedPlaylists; persistSaved(); renderSavedPlaylists(); }
        if (data.favs) { favs = data.favs; try { localStorage.setItem('ft_favs', JSON.stringify(favs)); } catch(e) {} renderFavs(); updateFavPlaylistBtns(); }
        if (data.history) { history = data.history; saveHistory(); renderHistory(); }
        customAlert('Import réussi', 'Tes données ont été restaurées avec succès.', {icon:'✅'});
      }, {confirmLabel:'Importer', icon:'📂'});
    } catch (err) {
      customAlert('Erreur', 'Fichier invalide : ' + err.message, {icon:'❌'});
    }
  };
  reader.readAsText(file);
}

// ============================================================
// EXPORT WAV AVEC MÉTADonnÉES RIFF (chunk 'ftmd')
// Permet à un autre utilisateur de l'app d'importer le WAV
// pour charger automatiquement la fréquence.
// ============================================================
function exportWavWithMetadata(hz, duration, label, diffVal) {
  if (!hz) hz = baseHz;
  if (!duration) duration = timerMin || 10;
  if (!label) label = currentLabel || (hz + ' Hz');
  if (!diffVal) diffVal = diff;
  const sampleRate = 44100;
  const numSamples = sampleRate * duration;
  let offlineCtx;
  try {
    offlineCtx = new OfflineAudioContext(2, numSamples, sampleRate);
  } catch (e) {
    customAlert('Erreur', 'Impossible de générer le WAV : ' + e.message, {icon:'❌'});
    return;
  }
  const merger = offlineCtx.createChannelMerger(2);
  const gain = offlineCtx.createGain();
  gain.gain.value = masterVolume || 0.25;
  const leftOsc_w = offlineCtx.createOscillator();
  const rightOsc_w = offlineCtx.createOscillator();
  leftOsc_w.type = 'sine'; rightOsc_w.type = 'sine';
  leftOsc_w.frequency.value = hz;
  rightOsc_w.frequency.value = hz + diffVal;
  const lg = offlineCtx.createGain(); lg.gain.value = 1;
  const rg = offlineCtx.createGain(); rg.gain.value = 1;
  leftOsc_w.connect(lg); rightOsc_w.connect(rg);
  lg.connect(merger, 0, 0); rg.connect(merger, 0, 1);
  merger.connect(gain); gain.connect(offlineCtx.destination);
  leftOsc_w.start(); rightOsc_w.start();

  offlineCtx.startRendering().then(function(buffer) {
    // Métadonnées à embarquer
    const meta = JSON.stringify({
      app: 'ft-binaural-x',
      version: 1,
      hz: hz,
      diff: diffVal,
      duration: duration,
      label: label,
      exportedAt: new Date().toISOString()
    });
    const metaBytes = new TextEncoder().encode(meta);
    const numChannels = buffer.numberOfChannels;
    const length = buffer.length;
    const audioDataSize = length * numChannels * 2;
    const metaChunkSize = metaBytes.length + 8; // 'ftmd' (4) + size (4) + data
    const wavBuffer = new ArrayBuffer(44 + audioDataSize + metaChunkSize + 8);
    const view = new DataView(wavBuffer);
    function writeString(off, str) {
      for (let i = 0; i < str.length; i++) view.setUint8(off + i, str.charCodeAt(i));
    }
    // RIFF header
    writeString(0, 'RIFF');
    view.setUint32(4, 36 + audioDataSize + metaChunkSize + 8, true);
    writeString(8, 'WAVE');
    // fmt chunk
    writeString(12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);  // PCM
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * 2, true);
    view.setUint16(32, numChannels * 2, true);
    view.setUint16(34, 16, true);
    // data chunk
    writeString(36, 'data');
    view.setUint32(40, audioDataSize, true);
    let offset = 44;
    for (let i = 0; i < length; i++) {
      for (let ch = 0; ch < numChannels; ch++) {
        let sample = Math.max(-1, Math.min(1, buffer.getChannelData(ch)[i]));
        sample = sample < 0 ? sample * 0x8000 : sample * 0x7FFF;
        view.setInt16(offset, sample, true);
        offset += 2;
      }
    }
    // ftmd chunk (métadonnées Fréquences Thérapeutiques)
    writeString(offset, 'ftmd'); offset += 4;
    view.setUint32(offset, metaBytes.length, true); offset += 4;
    for (let i = 0; i < metaBytes.length; i++) {
      view.setUint8(offset, metaBytes[i]); offset += 1;
    }
    const blob = new Blob([wavBuffer], {type: 'audio/wav'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'ft_' + hz + 'Hz_d' + diffVal + 'Hz_' + duration + 's.wav';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    customToast('✅ WAV généré avec métadonnées');
  }).catch(function(err) {
    console.error('WAV export error:', err);
    customAlert('Erreur', 'Génération WAV impossible : ' + err.message, {icon:'❌'});
  });
}

// Remplacer exportWav par la version avec metadata
function exportWav(hz, duration) {
  exportWavWithMetadata(hz, duration, currentLabel, diff);
}

// Importer un WAV et charger sa fréquence si metadata présente
function importWavFile(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const buf = e.target.result;
      const view = new DataView(buf);
      // Vérifier RIFF header
      if (view.getUint8(0) !== 0x52 || view.getUint8(1) !== 0x49 ||
          view.getUint8(2) !== 0x46 || view.getUint8(3) !== 0x46) {
        throw new Error('Pas un fichier WAV');
      }
      // Scanner les chunks pour trouver 'ftmd'
      let offset = 12; // après RIFF + WAVE
      let meta = null;
      while (offset < buf.byteLength - 8) {
        const chunkId = String.fromCharCode(
          view.getUint8(offset), view.getUint8(offset+1),
          view.getUint8(offset+2), view.getUint8(offset+3)
        );
        const chunkSize = view.getUint32(offset + 4, true);
        if (chunkId === 'ftmd') {
          const metaBytes = new Uint8Array(buf, offset + 8, chunkSize);
          const metaStr = new TextDecoder().decode(metaBytes);
          meta = JSON.parse(metaStr);
          break;
        }
        offset += 8 + chunkSize + (chunkSize % 2); // padding
      }
      if (!meta) {
        customAlert('WAV sans métadonnées', "Ce WAV ne contient pas de métadonnées Fréquences Thérapeutiques. Tu peux quand même l'écouter dans un lecteur audio externe.", {icon:'ℹ️'});
        return;
      }
      // Charger la fréquence
      showConfirm(
        'Fréquence trouvée',
        'Charger <b>' + (meta.label || meta.hz + ' Hz') + '</b><br>' +
        'Fréquence : ' + meta.hz + ' Hz<br>' +
        'Battement : ' + meta.diff + ' Hz<br>' +
        'Durée suggérée : ' + meta.duration + ' min',
        function() {
          baseHz = meta.hz;
          diff = meta.diff;
          timerMin = meta.duration || 10;
          currentLabel = meta.label || (meta.hz + ' Hz');
          setTimerChip(timerMin);
          updateDisplays();
          customAlert('Fréquence chargée', "Clique sur ▶ pour lancer l'écoute.", {icon:'✅'});
        },
        {confirmLabel: 'Charger', icon: '🎵'}
      );
    } catch (err) {
      customAlert('Erreur', 'Lecture du WAV impossible : ' + err.message, {icon:'❌'});
    }
  };
  reader.readAsArrayBuffer(file);
}

// Setup drag-and-drop et file input pour importer WAV
function setupWavImport() {
  // File input caché
  const existing = document.getElementById('ft-wav-input');
  if (existing) return;
  const input = document.createElement('input');
  input.type = 'file';
  input.id = 'ft-wav-input';
  input.accept = '.wav,audio/wav';
  input.style.display = 'none';
  input.addEventListener('change', function(e) {
    if (e.target.files && e.target.files[0]) {
      importWavFile(e.target.files[0]);
      e.target.value = ''; // reset
    }
  });
  document.body.appendChild(input);
}

// ============================================================
// FAVORIS PARTOUT — boutons ⭐ sur Symptômes, Protocoles, Pathogènes, Éveil
// (les favoris existent déjà pour les Minéraux via toggleFav)
// ============================================================
function toggleFavGeneric(key) {
  // key = "sympt:nom" | "proto:nom" | "path:nom" | "eveil:nom"
  const idx = favs.indexOf(key);
  if (idx >= 0) favs.splice(idx, 1);
  else favs.push(key);
  try { localStorage.setItem('ft_favs', JSON.stringify(favs)); } catch(e) {}
  renderFavs();
  updateFavPlaylistBtns();
}

function importUserDataPrompt() {
  const input = document.getElementById('ft-json-input');
  if (input) input.click();
}

// ============================================================
// RACCOURCIS CLAVIER
// ============================================================
document.addEventListener('keydown', function(e) {
  // Ignorer si on tape dans un input
  if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
  // Espace = play/pause
  if (e.code === 'Space') {
    e.preventDefault();
    if (playing) togglePause();
    else togglePlay();
  }
  // Échap = fermer modale/player
  if (e.code === 'Escape') {
    const player = document.getElementById('page-player');
    if (player && player.style.display !== 'none') {
      closePlayer();
      return;
    }
    const popup = document.getElementById('ft-popup');
    if (popup && popup.style.display !== 'none') {
      closePopup();
      return;
    }
    const help = document.getElementById('help-modal');
    if (help && help.style.display !== 'none') {
      toggleAide();
      return;
    }
  }
});

// ============================================================
// PATCH : modifier startAudio/stopAudio/startAudioSequence
// pour gérer volume master, halo, freq-row, historique
// ============================================================
const _origStartAudio = startAudio;
startAudio = function() {
  _origStartAudio.apply(this, arguments);
  // Après démarrage, appliquer le volume master
  setTimeout(function() {
    if (gainNode && audioCtx) {
      try { gainNode.gain.setTargetAtTime(masterVolume, audioCtx.currentTime, 0.05); } catch(e) {}
    }
    startHalo();
    updateFreqRowAnim();
    addToHistory(currentLabel, baseHz, timerMin, seqType || 'libre');
  }, 100);
};

const _origStopAudio = stopAudio;
stopAudio = function() {
  _origStopAudio.apply(this, arguments);
  setTimeout(function() {
    stopHalo();
    updateFreqRowAnim();
  }, 100);
};

const _origStartAudioSequence = startAudioSequence;
startAudioSequence = function() {
  _origStartAudioSequence.apply(this, arguments);
  setTimeout(function() {
    if (gainNode && audioCtx) {
      try { gainNode.gain.setTargetAtTime(masterVolume, audioCtx.currentTime, 0.05); } catch(e) {}
    }
    startHalo();
    updateFreqRowAnim();
  }, 100);
};

// ============================================================
// INITIALISATION DES NOUVELLES FEATURES
// (exécuté après init() car ce bloc vient après l'appel init() à la ligne 2060)
// ============================================================
setTimeout(function() {
  setupVolumeSlider();
  setupLiveSearch();
  setupWavImport();
  loadHistory();
  renderHistory();
  const isLight = document.documentElement.getAttribute('data-theme') === 'light';
  const meta = document.getElementById('meta-theme-color');
  if (meta) meta.content = isLight ? '#f5f7fb' : '#080b12';
}, 0);
