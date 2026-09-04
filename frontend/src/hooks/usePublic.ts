import { useEffect, useState } from "react";
import { publicGet, publicSettings, type CollectionName, type Settings } from "@/lib/api";

export function usePublicList<T>(collection: CollectionName) {
  const [data, setData] = useState<T[] | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    setLoading(true);
    publicGet<T>(collection)
      .then((rows) => {
        if (alive) setData(rows);
      })
      .catch((err: Error) => {
        if (alive) setError(err.message);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, [collection]);

  return { data, error, loading };
}

export function useSettings() {
  const [data, setData] = useState<Settings | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    publicSettings()
      .then((rows) => {
        if (alive) setData(rows);
      })
      .catch((err: Error) => {
        if (alive) setError(err.message);
      })
      .finally(() => {
        if (alive) setLoading(false);
      });
    return () => {
      alive = false;
    };
  }, []);

  return { data, error, loading };
}
