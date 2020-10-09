import React from 'react'
import Select from 'react-select'

import Board from './Board'
// import Quiz from './Quiz'

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
            <div className="container mt-4">
                <div className="d-flex justify-content-center">
                    <div className="col-xl-8 col-md-10 col-xs-12">
                        {show ?
                            <div>
                                <div onClick={this.handleClick} className="my-2">
                                    {
                                        levelBtn.map((lv, ilv) => (
                                            <button
                                                key={ilv}
                                                id={lv}
                                                className="btn btn-success btn-sm mr-1 mb-1"
                                            >
                                                {lv * 1000} words
                                            </button>
                                        ))
                                    }
                                </div>
                                <Select
                                    options={options}
                                    onChange={this.handleChange}
                                    placeholder="Select level"
                                    value={options.filter(opts => (opts.value === value))}
                                />
                            </div>
                            : <div className="mt-2">
                                <Board words={words.slice((value * 10 - 10), value * 10)} />
                                <button onClick={() => { this.setState({ show: true }) }}>
                                    Back
                                </button>
                              </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default Index