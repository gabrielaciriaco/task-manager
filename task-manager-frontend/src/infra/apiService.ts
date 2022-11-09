/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */

import { getAuthToken } from './authenticationService'

const BASE_API_URL = process.env.REACT_APP_BASE_API_URL

const contentTypeHeader = { 'Content-Type': 'application/json' }

const getHeaders = () => {
    const authToken = getAuthToken()

    return {
        ...contentTypeHeader,
        ...(authToken && { Authorization: `Bearer ${authToken}` }),
    }
}

const handleResponse = async (response: Response) => {
    const text = await response.text()
    const data = text && JSON.parse(text)
    if (!response.ok) {
        const error = (data && data.message) || response.statusText
        return Promise.reject(error)
    }
    return data
}

const get = async (path: string) => {
    const requestOptions = { method: 'GET', headers: getHeaders() }
    const url = `${BASE_API_URL}/${path}`
    return fetch(url, requestOptions).then(handleResponse)
}

const post = async (path: string, body: object) => {
    const requestOptions = { method: 'POST', headers: getHeaders(), body: JSON.stringify(body) }
    return fetch(`${BASE_API_URL}/${path}`, requestOptions).then(handleResponse)
}

const put = async (path: string, id?: string, body?: object) => {
    const requestOptions = {
        method: 'PUT',
        headers: getHeaders(),
        body: JSON.stringify(body || {}),
    }
    return fetch(`${BASE_API_URL}/${path}${id && `/${id}`}`, requestOptions).then(handleResponse)
}

const remove = async (path: string, id: string, body?: object) => {
    const requestOptions = {
        method: 'DELETE',
        headers: getHeaders(),
        body: JSON.stringify(body || {}),
    }
    return fetch(`${BASE_API_URL}/${path}/${id}`, requestOptions).then(handleResponse)
}

export { get, post, put, remove }
