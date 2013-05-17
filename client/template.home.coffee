Carrousel = [
  {
    url: "/blog/post/50648443491/fabrique-en-q42-komen-als-grote-winnaars-van-de-dutch"
    bg: "/images/carrousel/DIA13.jpg"
    text: "\"Disrupter of the year\""
    en_text: "\"Disrupter of the year\""
    pos: "left"
  }
  {
    url: "/blog/post/49503089620/q42-opent-vestiging-in-amsterdam"
    bg: "/images/carrousel/Q020.jpg"
    text: "Q42 opent vestiging in Amsterdam"
    en_text: "Q42 opens office in Amsterdam"
    pos: "right"
  }
  {
    url: "/blog/post/45861370772/q42-is-de-best-place-to-work-in-nederland"
    bg: "/images/carrousel/GPTW.jpg"
    text: "Q42 officieel dé Greatest Place to Work"
    en_text: "Q42 is officially the Greatest Place to Work"
    pos: "left"
  }
  {
    url: "http://quento.nl"
    en_url: "http://quento.com"
    bg: "/images/carrousel/quento.png"
    text: "Quento nu beschikbaar voor iOS en Android"
    en_text: "Quento now available for iOS and Android"
  }
  {
    url: "/blog/post/44245650650/kars-en-stef-waren-deze-week-bij-google-in"
    bg: "/images/carrousel/GoogleAward.jpg"
    text: "Q42 is Google Cloud Platform Partner of the Year"
  }
]

Template.carrousel_items.item = -> Carrousel
Template.carrousel_items.pos = -> @pos || "right"
Template.carrousel_items.url = ->
  if @en_url and Session.equals "lang", "en"
    @en_url
  else
    @url
Template.carrousel_items.text = ->
  if @en_text and Session.equals "lang", "en"
    @en_text
  else
    @text
Template.carrousel_items.bg = ->
  if @en_bg and Session.equals "lang", "en"
    @en_bg
  else
    @bg