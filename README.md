# METAR Decoder
A webapp to decode raw METAR data.

## What is a METAR?
Meteorological Aerodrome Report.
It is an aerodrome-specific routine weather report issued hourly either by a human observer or an automated system. Pilots use this information to check what the latest weather is like in the vicinity of the aerodrome.

## What does a METAR look like?
From [NOAA](https://www.aviationweather.gov/metar/data?ids=ksfo&format=decoded&date=&hours=0):

![metar](https://user-images.githubusercontent.com/42055941/114629451-3392c080-9c7e-11eb-8952-46d914c44e6f.png)


From the [webapp](https://joshjulius.github.io/aviation-api-metar-react/):

![recording](https://user-images.githubusercontent.com/42055941/114630447-3db5be80-9c80-11eb-8012-bbfdada9b91d.gif)

## Play around with the [webapp](https://joshjulius.github.io/aviation-api-metar-react/)!
Try searching for:
- KLAX
- KJFK
- PANC
- PHNL
- Or any other [USA ICAO Airport codes](https://en.wikipedia.org/wiki/List_of_airports_in_the_United_States).

## What I learned by building this project:
- JS (ES6)
  - Querying
  - Event listeners
  - Built-in methods like adding/removing classes
- React
  - Conditional rendering
  - Hooks (useState, useEffect, useContext)
- axios
  - async/await syntax
  - Fetching data and then displaying the data/error
- Regular expressions
- File organization
- Form validation
- Basic npm commands
- Basic integration and unit tests

## API Credit
I used [Aviation API](https://www.aviationapi.com/) to fetch the data needed for the webapp.

## What I would like to do next
- [ ] localStorage, so users could see their history of recently searched aerodromes.
- [ ] Complete the testing.
- [ ] Improve the UI.
