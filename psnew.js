const PS_PCT={"PS2_AB": {"EXP": ["1", "2-6", "7-84", "85-96", "97-99"], "ESQ": ["<1", "1-6", "7-85", "86-96", "97-99"], "SEN": ["1", "2-7", "8-85", "86-95", "96-99"], "OBS": ["1-2", "3-7", "8-86", "87-95", "96-99"], "SNS": ["1-2", "3-8", "9-83", "84-96", "97-99"], "COM": ["1-2", "3-7", "8-84", "85-96", "97-99"]}, "PS2_BB": {"TOT": ["<1", "1-16", "17-85", "86-96", "97-99"]}, "PS2_ESC": {"EXP": ["<1", "1-5", "6-86", "87-94", "95-99"], "ESQ": ["1-2", "3-6", "7-88", "89-96", "97-99"], "SEN": ["<1", "1-5", "6-86", "87-95", "96-99"], "OBS": ["<1", "1-4", "5-85", "86-95", "96-99"], "AUD": ["<1", "1-3", "4-88", "89-95", "96-99"], "VIS": ["", "1-3", "4-84", "85-94", "95-99"], "TAT": ["1", "2-5", "6-87", "88-95", "96-99"], "MOV": ["<1", "1-4", "5-86", "87-95", "96-99"], "COM": ["<1", "1-5", "6-80", "81-93", "94-99"], "F1": ["<1", "1-4", "5-87", "88-95", "96-99"], "F2": ["<1", "1-5", "6-87", "88-95", "96-99"], "F3": ["1-2", "3-5", "6-87", "88-96", "97-99"], "F4": ["1-2", "3-5", "6-87", "88-96", "97-99"]}, "PS2_CP": {"EXP": ["1-3", "4-13", "14-84", "85-99", ""], "ESQ": ["1-3", "4-5", "6-87", "88-95", "96-99"], "SEN": ["1-2", "3-5", "6-86", "87-97", "98-99"], "OBS": ["1-3", "4-7", "8-89", "90-95", "96-99"], "GER": ["<1", "1-5", "6-88", "89-96", "97-99"], "AUD": ["1-2", "3-6", "7-87", "88-95", "96-99"], "VIS": ["<1", "1-13", "14-83", "84-98", "99"], "TAT": ["1-2", "3-5", "6-87", "88-95", "96-99"], "MOV": ["1-2", "3-11", "12-89", "90-99", ">99"], "ORA": ["<1", "1-7", "8-88", "89-97", "98-99"], "COM": ["1-2", "3-6", "7-86", "87-95", "96-99"]}};
function psInvN(p){ const a=[-39.69683028665376,220.9460984245205,-275.9285104469687,138.357751867269,-30.66479806614716,2.506628277459239],b=[-54.47609879822406,161.5858368580409,-155.6989798598866,66.80131188771972,-13.28068155288572],c=[-0.007784894002430293,-0.3223964580411365,-2.400758277161838,-2.549732539343734,4.374664141464968,2.938163982698783],d=[0.007784695709041462,0.3224671290700398,2.445134137142996,3.754408661907416],pl=0.02425; let q,r;
  if(p<pl){ q=Math.sqrt(-2*Math.log(p)); return (((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5])/((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1); }
  if(p>1-pl){ q=Math.sqrt(-2*Math.log(1-p)); return -(((((c[0]*q+c[1])*q+c[2])*q+c[3])*q+c[4])*q+c[5])/((((d[0]*q+d[1])*q+d[2])*q+d[3])*q+1); }
  q=p-0.5; r=q*q; return (((((a[0]*r+a[1])*r+a[2])*r+a[3])*r+a[4])*r+a[5])*q/(((((b[0]*r+b[1])*r+b[2])*r+b[3])*r+b[4])*r+1); }
function psZ(pct,frac){ let lo,hi; const s=String(pct||''); if(!s) return null; if(s[0]==='<'){ lo=0.5; hi=1; } else if(s[0]==='>'){ lo=99; hi=99.9; } else { const m=s.split('-').map(Number); lo=m[0]; hi=m.length>1?m[1]:m[0]; if(lo===hi){ lo-=0.4; hi+=0.4; } }
  const p=Math.max(0.5,Math.min(99.5,lo+frac*(hi-lo))); return Math.max(-3,Math.min(3,psInvN(p/100))); }
function psLinha(s,b,pcts,max,n,sg,pts){
  let k=-1,fx='—',pc='—';
  if(b){ for(let j=0;j<5;j++) if(b[j]&&s>=b[j][0]&&s<=b[j][1]){ k=j; break; } fx=b[2][0]+' – '+b[2][1];
    if(k>=0){ const f=b[k][1]>b[k][0]?(s-b[k][0])/(b[k][1]-b[k][0]):.5; pc=(pcts&&pcts[k])||'—'; const z=pcts&&pcts[k]?psZ(pcts[k],f):null; pts.push({n:sg,x:z!=null?z:Math.max(-3,Math.min(3,(k-2)+(f-.5)*.9)),s:s}); } }
  return {cells:[n,s,fx,pc,k>=0?PS_CL[k]:'—'],nivel:k,serie:{l:String(n).split('/')[0],v:s,max:max}};
}
function relPS2(A){
  const v=i=>{ const n=+A[i-1]; return isNaN(n)?0:n; };
  const nome={Exploração:'Exploração/Criança exploradora',Esquiva:'Esquiva/Criança que se esquiva',Sensibilidade:'Sensibilidade/Criança sensível',Observação:'Observação/Criança observadora','Sensibilidade oral':'Oral'};
  const sig={Exploração:'EXP',Esquiva:'ESQ',Sensibilidade:'SEN',Observação:'OBS',Geral:'GER',Auditivo:'AUD',Visual:'VIS',Tato:'TAT',Movimentos:'MOV','Sensibilidade oral':'ORA',Comportamental:'COM'};
  const pts=[];
  const lin=g=>g.map(([n,its,max,b])=>psLinha(its.reduce((x,i)=>x+v(i),0),b,PS_PCT.PS2_CP[sig[n]],max,nome[n]||n,sig[n]||n,pts));
  const qu=lin(PS_QUA), se=lin(PS_SEC), na=A.filter(c=>c==='0').length;
  return {cols:['Seção','Categoria','Pontuação Bruta','Faixa da Pontuação','Faixa de percentil','Classificação'],
    grupos:[{nome:'Quadrantes',linhas:qu},{nome:'Seções sensoriais',linhas:se.slice(0,6)},{nome:'Seções comportamentais',linhas:se.slice(6)}],
    charts:[{id:'Quadrantes (Padrões)',titulo:'Pontuação Bruta',eixo:'Pontos Brutos',serie:qu.map(x=>x.serie)},{id:'Seções',titulo:'Pontuação Bruta',eixo:'Pontos Brutos',serie:se.map(x=>x.serie)}],
    curva:{titulo:'Perfil Sensorial 2 - Distribuição',pts:pts},
    nota:'Classificação e faixa de percentil pelo caderno e pelo Anexo A (Tabela A.2) do manual do Perfil Sensorial 2 (Criança Pequena). "Faixa da Pontuação" é a faixa bruta de "Exatamente como a maioria"; "Faixa de percentil" é a da classificação obtida. "Não se aplica" vale 0 ponto'+(na?' ('+na+' item(ns) marcados assim)':'')+'. A posição exata dos pontos na curva é estimada dentro da faixa de percentil.'};
}
const PSX={
 PS2_AB:{tit:'Perfil Sensorial 2 Abreviado (3 a 14 anos)',grupos:[
  ['Quadrantes',[['Exploração/Criança exploradora','EXP',[6,7,8,11,14,31,32],35,[[0,0],[1,5],[6,17],[18,23],[24,35]],PS_PCT.PS2_AB['EXP']],['Esquiva/Criança que se esquiva','ESQ',[16,17,18,19,20,22,23,24,26],45,[[0,1],[2,8],[9,22],[23,29],[30,45]],PS_PCT.PS2_AB['ESQ']],['Sensibilidade/Criança sensível','SEN',[1,2,3,4,5,21,25,28,29,33],50,[[0,2],[3,9],[10,24],[25,31],[32,50]],PS_PCT.PS2_AB['SEN']],['Observação/Criança observadora','OBS',[9,10,12,13,15,27,30,34],40,[[0,1],[2,5],[6,16],[17,20],[21,40]],PS_PCT.PS2_AB['OBS']]]],
  ['Seções sensoriais e comportamentais',[['Sensorial','SNS',_pr(1,14),70,[[0,4],[5,13],[14,31],[32,40],[41,70]],PS_PCT.PS2_AB['SNS']],['Comportamental','COM',_pr(15,34),100,[[0,5],[6,18],[19,46],[47,59],[60,100]],PS_PCT.PS2_AB['COM']]]]]},
 PS2_BB:{tit:'Perfil Sensorial 2 Bebê (0 a 6 meses)',grupos:[
  ['Seções',[['Processamento geral','GER',_pr(1,8),40,null],['Processamento auditivo','AUD',_pr(9,12),20,null],['Processamento visual','VIS',_pr(13,16),20,null],['Processamento do tato','TAT',_pr(17,19),15,null],['Processamento de movimentos','MOV',_pr(20,23),20,null],['Sensibilidade oral','ORA',_pr(24,25),10,null]]],
  ['Pontuação total',[['Pontuação total do Bebê','TOT',_pr(1,25),125,[[0,30],[31,40],[41,61],[62,71],[72,125]],PS_PCT.PS2_BB['TOT']]]]]},
 PS2_ESC:{tit:'Perfil Sensorial 2 Acompanhamento Escolar (3 a 14 anos)',grupos:[
  ['Quadrantes',[['Exploração/Criança exploradora','EXP',[11,14,15,17,18,24,28,29],40,[[0,0],[1,6],[7,19],[20,25],[26,40]],PS_PCT.PS2_ESC['EXP']],['Esquiva/Criança que se esquiva','ESQ',[5,22,30,31,32,36,37,38,40,41,42,43],60,[[0,1],[2,7],[8,21],[22,27],[28,60]],PS_PCT.PS2_ESC['ESQ']],['Sensibilidade/Criança sensível','SEN',[4,6,7,12,19,20,21,25,35,39,44],55,[[0,2],[3,9],[10,23],[24,30],[31,55]],PS_PCT.PS2_ESC['SEN']],['Observação/Criança observadora','OBS',[1,2,3,8,9,10,13,16,23,26,27,33,34],65,[[0,0],[1,9],[10,28],[29,37],[38,65]],PS_PCT.PS2_ESC['OBS']]]],
  ['Seções sensoriais e comportamentais',[['Auditivo','AUD',_pr(1,7),35,[[0,1],[2,5],[6,15],[16,19],[20,35]],PS_PCT.PS2_ESC['AUD']],['Visual','VIS',_pr(8,14),35,[null,[0,5],[6,17],[18,23],[24,35]],PS_PCT.PS2_ESC['VIS']],['Tato','TAT',_pr(15,22),40,[[0,0],[1,4],[5,15],[16,20],[21,40]],PS_PCT.PS2_ESC['TAT']],['Movimentos','MOV',_pr(23,30),40,[[0,0],[1,5],[6,17],[18,23],[24,40]],PS_PCT.PS2_ESC['MOV']],['Comportamental','COM',_pr(33,43),55,[[0,1],[2,8],[9,22],[23,29],[30,55]],PS_PCT.PS2_ESC['COM']]]],
  ['Fatores escolares',[['Fator escolar 1','F1',[1,2,8,9,10,15,16,17,24,25,26,27,28],65,[[0,0],[1,9],[10,28],[29,37],[38,65]],PS_PCT.PS2_ESC['F1']],['Fator escolar 2','F2',[4,11,12,14,18,19,20,29,35,44],50,[[0,2],[3,9],[10,24],[25,30],[31,50]],PS_PCT.PS2_ESC['F2']],['Fator escolar 3','F3',[3,5,6,7,21,22,33,38,39,40,41,42],60,[[0,2],[3,8],[9,23],[24,29],[30,60]],PS_PCT.PS2_ESC['F3']],['Fator escolar 4','F4',[13,23,30,31,32,34,36,37,43],45,[[0,1],[2,5],[6,16],[17,21],[22,45]],PS_PCT.PS2_ESC['F4']]]]]}
};
function relPSX(A,cfg){
  const v=i=>{ const n=+A[i-1]; return isNaN(n)?0:n; }, pts=[];
  const grupos=cfg.grupos.map(([gn,rows])=>({nome:gn,linhas:rows.map(([n,sg,its,max,b,pcts])=>psLinha(its.reduce((x,i)=>x+v(i),0),b,pcts,max,n,sg,pts))}));
  const na=A.filter(c=>c==='0').length;
  return {cols:['Seção','Categoria','Pontuação Bruta','Faixa da Pontuação','Faixa de percentil','Classificação'],grupos:grupos,
    charts:grupos.map(g=>({id:g.nome,titulo:'Pontuação Bruta',eixo:'Pontos Brutos',serie:g.linhas.map(l=>l.serie)})),
    curva:pts.length?{titulo:cfg.tit+' - Distribuição',pts:pts}:null,
    nota:'Classificação e faixa de percentil pelo caderno e pelo Anexo A do manual do '+cfg.tit+'. "Faixa da Pontuação" é a faixa bruta de "Exatamente como a maioria"; "Faixa de percentil" é a da classificação obtida. "Não se aplica" vale 0 ponto'+(na?' ('+na+' item(ns) marcados assim)':'')+'. A posição exata dos pontos na curva é estimada dentro da faixa de percentil.'};
}
