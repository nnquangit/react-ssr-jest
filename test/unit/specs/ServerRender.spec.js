import React from 'react'
import {ServerRender} from '@/pages/ServerRender'
import renderer from 'react-test-renderer'
import Enzyme, {mount} from 'enzyme'
import {createApi} from '@/services/api'
import {createStore} from '@/store'
import {createFirebase} from '@/services/firebase'
import {createCookies} from '@/services/cookies'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({adapter: new Adapter()})

describe('Pages:ServerRender', () => {
    beforeEach(() => {
        const store = createStore()
        const $cookies = createCookies()
        const $api = createApi(store)
        const $firebase = createFirebase()

        store.attachServices({$api, $cookies, $firebase})
        store.replaceState({
            ...store.getState(),
            router: {
                location: {
                    hash: '',
                    pathname: '',
                    query: {page: 1},
                    search: '',
                    state: {}
                }
            }
        })

        return ServerRender.asyncData(store)
    })

    it('react-test-renderer', () => {
        const component = renderer.create(<ServerRender/>)
        const state = component.getInstance().state
        expect(state.result.results.length).toBeGreaterThanOrEqual(1)
    })

    it('enzyme', () => {
        const component = mount(<ServerRender/>)
        expect(component.find('.media').length).toBeGreaterThanOrEqual(1)
    })
})
