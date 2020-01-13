import React, {useCallback, useContext, useEffect, useState} from "react";
import {useHttp} from "../../hooks/http.hook";
import {AuthContext} from "../../context/AuthContext";
import {Loader} from "../../components/Loader/Loader";
import {LinksList} from "../../components/LinksList/LinksList";

export const LinksPage = () => {
  const [links, setLinks] = useState([]);
  const {request, loading} = useHttp();
  const {token} = useContext(AuthContext);

  const fetchLinks = useCallback(async () => {
    try {
      const fethched = await request('/api/link', 'Get', null, {
        Authorization: `Bearer ${token}`
      })
      setLinks(fethched)
    } catch (e) {

    }
  }, [token, request]);

  useEffect(() => {
    fetchLinks();
  }, [fetchLinks]);

  if(loading) {
    return <Loader/>;
  }

  return (
    <div className="container">
      {!loading && <LinksList links={links}/>}
    </div>
  );
};