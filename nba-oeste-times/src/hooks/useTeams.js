import { useState, useEffect } from 'react';
import { fetchWestTeams } from '../services/api';

export default function useTeams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadTeams = async () => {
      try {
        const teamsData = await fetchWestTeams();
        if (isMounted) {
          setTeams(teamsData);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Erro ao carregar times');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  return { teams, loading, error };
}
