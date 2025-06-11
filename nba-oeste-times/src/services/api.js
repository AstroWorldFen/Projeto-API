const BASE_URL = 'https://api.balldontlie.io/v1';
const BALLDONTLIE_API_KEY = '0b131f06-5cd4-4d55-bd71-3fc9fe267822';

// IDs dos times da Conferência Oeste
const WEST_TEAM_IDS = [
  7,   // Dallas Mavericks
  8,   // Denver Nuggets
  10,  // Golden State Warriors
  11,  // Houston Rockets
  13,  // LA Clippers
  14,  // Los Angeles Lakers
  15,  // Memphis Grizzlies
  18,  // Minnesota Timberwolves
  19,  // New Orleans Pelicans
  21,  // Oklahoma City Thunder
  24,  // Phoenix Suns
  25,  // Portland Trail Blazers
  26,  // Sacramento Kings
  27,  // San Antonio Spurs
  29   // Utah Jazz
];

const TEAM_DATA = {
  7: { name: "Mavericks", abbreviation: "DAL", city: "Dallas", conference: "West", division: "Southwest" },
  8: { name: "Nuggets", abbreviation: "DEN", city: "Denver", conference: "West", division: "Northwest" },
  10: { name: "Warriors", abbreviation: "GSW", city: "San Francisco", conference: "West", division: "Pacific" },
  11: { name: "Rockets", abbreviation: "HOU", city: "Houston", conference: "West", division: "Southwest" },
  13: { name: "Clippers", abbreviation: "LAC", city: "Los Angeles", conference: "West", division: "Pacific" },
  14: { name: "Lakers", abbreviation: "LAL", city: "Los Angeles", conference: "West", division: "Pacific" },
  15: { name: "Grizzlies", abbreviation: "MEM", city: "Memphis", conference: "West", division: "Southwest" },
  18: { name: "Timberwolves", abbreviation: "MIN", city: "Minneapolis", conference: "West", division: "Northwest" },
  19: { name: "Pelicans", abbreviation: "NOP", city: "New Orleans", conference: "West", division: "Southwest" },
  21: { name: "Thunder", abbreviation: "OKC", city: "Oklahoma City", conference: "West", division: "Northwest" },
  24: { name: "Suns", abbreviation: "PHX", city: "Phoenix", conference: "West", division: "Pacific" },
  25: { name: "Trail Blazers", abbreviation: "POR", city: "Portland", conference: "West", division: "Northwest" },
  26: { name: "Kings", abbreviation: "SAC", city: "Sacramento", conference: "West", division: "Pacific" },
  27: { name: "Spurs", abbreviation: "SAS", city: "San Antonio", conference: "West", division: "Southwest" },
  29: { name: "Jazz", abbreviation: "UTA", city: "Salt Lake City", conference: "West", division: "Northwest" }
};

const TEAM_INFO = {
  7: { logo: 'https://cdn.nba.com/logos/nba/1610612742/global/L/logo.svg', titles: 1, history: 'Os Mavericks foram campeões em 2011 com Dirk Nowitzki e agora contam com Luka Dončić como seu grande astro.', keyPlayers: ['Luka Dončić', 'Kyrie Irving', 'Dereck Lively II'] },
  8: { logo: 'https://cdn.nba.com/logos/nba/1610612743/global/L/logo.svg', titles: 1, history: 'O Denver Nuggets foi fundado em 1967 e conquistou seu primeiro título da NBA em 2023 com Nikola Jokić liderando a equipe.', keyPlayers: ['Nikola Jokić', 'Jamal Murray', 'Michael Porter Jr.'] },
  10: { logo: 'https://cdn.nba.com/logos/nba/1610612744/global/L/logo.svg', titles: 7, history: 'Os Warriors são uma das dinastias modernas da NBA, com títulos em 2015, 2017, 2018 e 2022 liderados por Stephen Curry.', keyPlayers: ['Stephen Curry', 'Klay Thompson', 'Draymond Green'] },
  11: { logo: 'https://cdn.nba.com/logos/nba/1610612745/global/L/logo.svg', titles: 2, history: 'Os Rockets foram bicampeões na era de Hakeem Olajuwon e hoje apostam em jovens promissores.', keyPlayers: ['Jalen Green', 'Alperen Sengun', 'Fred VanVleet'] },
  13: { logo: 'https://cdn.nba.com/logos/nba/1610612746/global/L/logo.svg', titles: 0, history: 'Os Clippers compartilham a cidade com os Lakers e buscam seu primeiro título liderados por Kawhi Leonard e Paul George.', keyPlayers: ['Kawhi Leonard', 'Paul George', 'James Harden'] },
  14: { logo: 'https://cdn.nba.com/logos/nba/1610612747/global/L/logo.svg', titles: 17, history: 'Os Los Angeles Lakers são uma das franquias mais icônicas da NBA. Fundados em 1947, possuem uma rica história com estrelas como Magic Johnson, Kobe Bryant e LeBron James.', keyPlayers: ['LeBron James', 'Luka Dončić', 'D\'Angelo Russell'] },
  15: { logo: 'https://cdn.nba.com/logos/nba/1610612763/global/L/logo.svg', titles: 0, history: 'Os Grizzlies têm uma das torcidas mais apaixonadas da NBA. Ja Morant é a estrela da nova geração.', keyPlayers: ['Ja Morant', 'Jaren Jackson Jr.', 'Desmond Bane'] },
  18: { logo: 'https://cdn.nba.com/logos/nba/1610612750/global/L/logo.svg', titles: 0, history: 'Os Timberwolves são conhecidos por terem revelado Kevin Garnett. Hoje, Anthony Edwards é o principal nome da franquia.', keyPlayers: ['Anthony Edwards', 'Karl-Anthony Towns', 'Rudy Gobert'] },
  19: { logo: 'https://cdn.nba.com/logos/nba/1610612740/global/L/logo.svg', titles: 0, history: 'O New Orleans Pelicans foi fundado em 2002 (originalmente como Hornets) e é uma equipe jovem em reconstrução com muito potencial.', keyPlayers: ['Zion Williamson', 'Brandon Ingram', 'CJ McCollum'] },
  21: { logo: 'https://cdn.nba.com/logos/nba/1610612760/global/L/logo.svg', titles: 1, history: 'O Thunder já contou com Durant, Westbrook e Harden. Agora aposta em jovens como Shai Gilgeous-Alexander.', keyPlayers: ['Shai Gilgeous-Alexander', 'Chet Holmgren', 'Jalen Williams'] },
  24: { logo: 'https://cdn.nba.com/logos/nba/1610612756/global/L/logo.svg', titles: 0, history: 'O Phoenix Suns foi finalista da NBA várias vezes, incluindo 2021 com Devin Booker e Chris Paul, mas ainda não conquistou o título.', keyPlayers: ['Kevin Durant', 'Devin Booker', 'Bradley Beal'] },
  25: { logo: 'https://cdn.nba.com/logos/nba/1610612757/global/L/logo.svg', titles: 1, history: 'Os Trail Blazers foram campeões em 1977 e contaram com lendas como Bill Walton e Clyde Drexler.', keyPlayers: ['Scoot Henderson', 'Anfernee Simons', 'Deandre Ayton'] },
  26: { logo: 'https://cdn.nba.com/logos/nba/1610612758/global/L/logo.svg', titles: 1, history: 'Os Kings são a franquia mais antiga da NBA ainda em atividade. Foram campeões em 1951 como Rochester Royals.', keyPlayers: ['De\'Aaron Fox', 'Domantas Sabonis', 'Keegan Murray'] },
  27: { logo: 'https://cdn.nba.com/logos/nba/1610612759/global/L/logo.svg', titles: 5, history: 'Sob o comando de Gregg Popovich, os Spurs dominaram a NBA nos anos 2000 com Tim Duncan, Tony Parker e Manu Ginóbili.', keyPlayers: ['Victor Wembanyama', 'Devin Vassell', 'Keldon Johnson'] },
  29: { logo: 'https://cdn.nba.com/logos/nba/1610612762/global/L/logo.svg', titles: 0, history: 'O Utah Jazz teve seus momentos de glória nos anos 90 com Karl Malone e John Stockton, mas ainda busca seu primeiro título.', keyPlayers: ['Lauri Markkanen', 'Jordan Clarkson', 'Walker Kessler'] }
};

const fetchOptions = {
  headers: {
    'Authorization': BALLDONTLIE_API_KEY
  }
};

/**
 * Combina dados estáticos com dados da API
 * @param {number} teamId 
 * @param {Object} apiData 
 * @returns Objeto completo do time
 */
const mergeTeamData = (teamId, apiData = {}) => {
  const staticBase = TEAM_DATA[teamId] || {};
  const staticInfo = TEAM_INFO[teamId] || {};
  
  return {
    ...staticBase,
    ...staticInfo,
    ...apiData,
    id: teamId,
    players: apiData.players || []
  };
};

/**
 * Busca estatísticas dos jogadores de um time em uma temporada
 * @param {number} teamId 
 * @param {number} season 
 * @returns Array de objetos com jogador e suas estatísticas
 */
export const fetchTeamStats = async (teamId) => {
  const SEASON = 2024;

  try {
    const playersRes = await fetch(
      `${BASE_URL}/players?per_page=100&team_ids[]=${teamId}`,
      fetchOptions
    );
    const playersData = await playersRes.json();
    
    if (!playersData.data || playersData.data.length === 0) return [];

    const statsPromises = playersData.data.map(async (player) => {
      const statsRes = await fetch(
        `${BASE_URL}/season_averages?season=${SEASON}&player_ids[]=${player.id}`,
        fetchOptions
      );
      const statsData = await statsRes.json();
      return {
        player,
        stats: statsData.data[0] || null
      };
    });

    const statsResults = await Promise.all(statsPromises);
    return statsResults.filter(item => item.stats !== null);
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return [];
  }
};

/**
 * Busca times da conferência Oeste
 * @returns Array de times
 */
export const fetchWestTeams = async () => {
  try {
    const response = await fetch(`${BASE_URL}/teams`, fetchOptions);
    const data = await response.json();
    
    return WEST_TEAM_IDS.map(id => {
      const apiTeam = data.data?.find(t => t.id === id) || {};
      return mergeTeamData(id, apiTeam);
    });
  } catch (error) {
    console.error('Erro ao buscar times:', error);
    return WEST_TEAM_IDS.map(id => mergeTeamData(id));
  }
};

/**
 * Busca detalhes completos de um time
 * @param {number} teamId 
 * @returns Objeto com detalhes do time
 */
export const fetchTeamDetails = async (teamId) => {
  try {
    teamId = Number(teamId);
    
    const [teamRes, playersRes] = await Promise.all([ 
      fetch(`${BASE_URL}/teams/${teamId}`, fetchOptions),
      fetch(`${BASE_URL}/players?per_page=100&team_ids[]=${teamId}`, fetchOptions)
    ]);

    const teamData = teamRes.ok ? await teamRes.json() : {};
    const playersData = playersRes.ok ? await playersRes.json() : {};

    return mergeTeamData(teamId, {
      ...teamData,
      players: playersData.data || []
    });
  } catch (error) {
    console.error('Erro ao buscar detalhes do time:', error);
    return mergeTeamData(Number(teamId));
  }
};
