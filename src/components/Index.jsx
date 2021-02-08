import React from 'react'
import Select from 'react-select'
import { BsHouse } from 'react-icons/bs'

import Note from './Note'
import Board from './Board'

class Index extends React.Component {
    constructor() {
        super()

        this.state = {
            options: [],
            words: [],
            index: 1,
            value: 0,
            show: true
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        fetch('words.json')
            .then(res => res.json())
            .then(words => {
                this.setState({
                    words
                })
            })
            .catch(err => {
                this.setState({
                    error: true,
                    message: err.message
                })
            })
    }

    handleChange(e) {
        this.setState({
            value: e.value,
            show: false
        })
    }

    handleClick(e) {
        if (e.target.tagName !== 'BUTTON') return

        this.setState({
            index: e.target.id,
            value: 0
        })
    }

    render() {
        const { index, value, words, show } = this.state
        const limit = index * 100
        const idx = +index === 1 ? 1 : limit - 99
        const levelBtn = [1, 2, 3, 4, 5, 6]
        const options = []

        for (let i = idx; i <= limit; i++) {
            options.push({ value: i, label: 'Lesson ' + i })
        }

        return (
            <div className="container">
                <nav className="navbar navbar-light bg-dark mb-2">
                    <div className="d-flex justify-content-center" style={{ width: '100%' }}>
                        <h4 className="text-white">Learn Japanese Vocabulary</h4>
                    </div>
                </nav>
                <div className="d-flex justify-content-center">
                    <div className="col-xl-8 col-md-10 col-xs-12">
                        {show
                            ? <div>
                                <div className="d-flex justify-content-center">
                                    <div
                                        onClick={this.handleClick}
                                        role="group"
                                        className="btn-group my-2">
                                        {levelBtn.map((lv, ilv) => (
                                                <button
                                                    key={ilv}
                                                    id={lv}
                                                    className="btn btn-dark">
                                                    {lv}
                                                </button>
                                            ))
                                        }
                                    </div>
                                </div>
                                <Select
                                    options={options}
                                    onChange={this.handleChange}
                                    placeholder="Select level"
                                    value={options.filter(opts => (opts.value === value))}
                                />
                                <Note />
                            </div>
                            : <div className="mt-2">
                                <Board words={words.slice((value * 10 - 10), value * 10)} />
                                <div>
                                    <button
                                        className="btn btn-light btn-block mt-4"
                                        onClick={() => { this.setState({ show: true }) }}
                                    >
                                        <BsHouse size={20} className="mb-1" /> Back to homepage
                                    </button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Index