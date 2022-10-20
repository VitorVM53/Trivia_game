import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import { hashEmail } from '../API/tokenReques';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      hash: '',
    };
  }

  componentDidMount() {
    this.getUrlImg();
  }

  getUrlImg = async () => {
    const { email } = this.props;
    const dataImg = hashEmail(email);
    this.setState({ hash: dataImg });
  }

  render() {
    const { hash } = this.state;
    const { name, score } = this.props;
    return (
      <header className='shadow-box p-3 mb-3 bg-white border-bottom'>
        <div
        className='grid-class container-fluid d-grid gap-3 align-items-center'
        >
          <div className='d-flex flex-wrap align-items-center justify-content-center'>
            <img
              src={ logo }
              className="box-logo d-flex align-items-center mb-2 mb-lg-0 me-2"
              alt="logo"
            />
            <ul className='nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0'>
              <li className='nav-link px-2 link-secondary'>
                <h4
                  data-testid="header-player-name"
                >
                  Player: { name }
                </h4>
              </li>
              <li className='nav-link px-2 link-secondary'>
                <h4
                  data-testid="header-score"
                >
                  Pontos: { score }
                </h4>
              </li>
            </ul>
            <img
              src={ `https://www.gravatar.com/avatar/${hash}` }
              alt="avatar-profile"
              data-testid="header-profile-picture"
              className='box-profile text-end rounded-circle'
            />
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.player.gravatarEmail,
  name: state.player.name,
  score: state.player.score,
});

export default connect(mapStateToProps)(Header);
