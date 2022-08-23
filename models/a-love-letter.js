const axios = require('axios');
const dayjs = require('dayjs');

/** @name 公众号appId */
const appId = 'wx3138af1a3a1f790e';
/** @name 公众号appSecret */
const appSecret = 'f2ae5e07202ccb4c96c720cd28e8840f';
/** @name 微信api，请求accessToken地址 */
const wxTokenApiUrl = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`;
/** @name 发送消息api */
const wxSendApiUrl = 'https://api.weixin.qq.com/cgi-bin/message/template/send';
/**  @name 恋爱日期2022-02-13 */
const loveDay = dayjs('2022-02-13');
/** @name 天气api */
const weatherApi = 'https://www.yiketianqi.com/free/day?appid=79866636&appsecret=Ou1cNjRE&unescape=1&city=%E5%8C%97%E4%BA%AC'
/** @name 情书api */
const letterApi = 'https://v2.alapi.cn/api/qinghua?token=V8EuVhzqS6B4gCZR';
/** @name 女朋友openId */
const openId_i = 'oLQCw6hW8jaMyBbZorZiRLqUy3y0';
const openId = 'oLQCw6u6ZJ_F2sv7YieWusYNvko4';

const aLoveLetter = async () => {
  const title = "波波的一封情书";
  const day = dayjs().diff(loveDay, 'day') + 1;
  const accessToken = (await axios.get(wxTokenApiUrl)).data.access_token;
  const weather = (await axios.get(weatherApi)).data;
  const letter = (await axios.get(letterApi)).data.data.content;
  await axios.post(wxSendApiUrl, {
    touser: openId_i,
    template_id: 'SoSaIH9WATaePdxCFTcnA0l4ILfsSi2PtZyoMJC0hc4',
    data: {
      title: {
        value: dayjs().format('YYYY年MM月DD日')
      },
      weather: {
        value: weather.wea
      },
      weather_day: {
        value: `${weather.tem_day}度`
      },
      weather_night: {
        value: `${weather.tem_night}度`
      },
      loveday: {
        value: `${day}天`
      },
      letter: {
        value: `${letter}       `,
        color: '#bb0000'
      }
    }
  }, {
    params: {
      access_token: accessToken
    }
  })
  const res = await axios.post(wxSendApiUrl, {
    touser: openId,
    template_id: 'SoSaIH9WATaePdxCFTcnA0l4ILfsSi2PtZyoMJC0hc4',
    data: {
      title: {
        value: dayjs().format('YYYY年MM月DD日')
      },
      weather: {
        value: weather.wea
      },
      weather_day: {
        value: `${weather.tem_day}度`
      },
      weather_night: {
        value: `${weather.tem_night}度`
      },
      loveday: {
        value: `${day}天`
      },
      letter: {
        value: `${letter}       `,
        color: '#bb0000'
      }
    }
  }, {
    params: {
      access_token: accessToken
    }
  })
  console.log(day, accessToken, weather, letter, res, );
}

module.exports = aLoveLetter;