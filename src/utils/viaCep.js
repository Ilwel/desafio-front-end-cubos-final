const makeCepUrl = (cep) => `https://viacep.com.br/ws/${cep}/json/`;

async function getDataByCep(cep) {
  try {

    const res = await fetch(makeCepUrl(cep), {
      method: 'GET'
    })

    const data = await res.json();
    return data;

  } catch (error) {

    return false;

  }

}

export {

  getDataByCep

}