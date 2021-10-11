function formatReal(int) {
  var tmp = int + '';
  tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
  if (tmp.length > 6)
    tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
  if (tmp.length < 4 && tmp.length > 1)
    tmp = '0' + tmp;

  return tmp;
}

function formatDate(str) {
  var data = new Date(str),
    dia = data.getDate().toString(),
    diaF = (dia.length === 1) ? '0' + dia : dia,
    mes = (data.getMonth() + 1).toString(), //+1 pois no getMonth Janeiro começa com zero.
    mesF = (mes.length === 1) ? '0' + mes : mes,
    anoF = data.getFullYear();
  return diaF + "/" + mesF + "/" + anoF;
}

export {
  formatReal,
  formatDate
}
