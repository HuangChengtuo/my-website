declare module "@/static/json/app.json" {
  const temp: string[]
  export default temp
}

type Site = { begin: string, site: string }

interface Bangumi {
  begin: string,
  end: string,
  title: string,
  sites: Site[]
}

declare module "@/static/json/bangumi.json" {
  const temp: Bangumi[]
  export default temp
}
