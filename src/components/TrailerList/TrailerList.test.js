import * as React from 'react'
import Trailer from './Trailer'
import TrailerList from './TrailerList'
import renderer from 'react-test-renderer'

describe('Trailer tests', () => {
  it('Snapshot test', () => {
    const props = {
      trailer: 'as213'
    }

    const component = renderer.create(
      <Trailer {...props} />
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('TrailerList tests', () => {
  it('Snapshot test', () => {
    const props = [{
      id: '3213',
      key: '3213'
    }]

    const component = renderer.create(
      <TrailerList data={props} />
    )

    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
