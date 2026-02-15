import axios from 'axios'

const BASE_URL = "https://geocoding-api.open-meteo.com/v1/search"

export async function getGeoCode(query) {
    const response = await axios.get(BASE_URL, {
        params: {
            name: query,
            count: 5,
            language: "en"
        }
    })

    const results = response.data.results ?? []

    const cityCandidates = results.filter(r => 
        typeof r.feature_code === "string" && r.feature_code.startsWith("PPL")
    )
    cityCandidates.sort((a, b) => (b.population ?? 0) - (a.population ?? 0));

    return cityCandidates.map(r => ({
        id: r.id,
        label: `${r.name}${r.admin1 ? ", " + r.admin1 : ""}, ${r.country}`,
        latitude: r.latitude,
        longitude: r.longitude,
        country_code: r.country_code,
    }));

}