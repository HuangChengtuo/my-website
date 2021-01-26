declare module "@/static/json/app.json" {
  const temp: string[]
  export default temp
}

interface Bangumi {
  begin: string;
  end: string;
  title: string;
}

declare module "@/static/json/bangumi.json" {
  const temp: Bangumi[]
  export default temp
}
