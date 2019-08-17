const API_URL = "https://share.vain0x.tk"

const main = () => {
  const key = (document.location.search || "").slice(1)
  if (key) {
    const url = `${API_URL}/entry?key=${encodeURIComponent(key)}`
    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error(res.statusText)
        }

        return res.text()
      })
      .catch(err => {
        console.error(err)
        return err.statusText
      })
      .then(value => {
        document.body.textContent = value
      })
  }
}

document.addEventListener("DOMContentLoaded", main)
