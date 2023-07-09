export const setCookie = (name, value, days = 30) => {
	let expires;
	if (days) {
		const date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000));
		// date.setTime(date.getTime() + (days * 1000)); // seconds (for testing)
		expires = `expires=${date.toUTCString()}`;
	}
	document.cookie = `${name}=${value || ""}; ${expires}; path=/;`;
}

export const getCookie = () => {
  return document.cookie.split(';').some(c => {
      return c.trim().startsWith(name + '=');
  });
}

export const deleteCookie = ( name, path, domain )  =>{
  if( getCookie( name ) ) {
    document.cookie = name + "=" +
      ((path) ? ";path="+path:"")+
      ((domain)?";domain="+domain:"") +
      ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
  }
}