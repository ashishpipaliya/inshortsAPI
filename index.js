const express = require('express');
const axios = require('axios');
const port = process.env.PORT || 3000;

const app = express();

app.get('/:category', (req, res) => {

    var category = req.params.category;

    const base_url = "http://inshorts.com/api/en/search/trending_topics/" + category + "&max_limit=50&type=NEWS_CATEGORY";

    var newsResponse = {};
    var articles = [];

    axios.get(base_url).then((response) => {
        var articleCount = response.data.data.news_list.length;

        newsResponse["total"] = articleCount;
        newsResponse["category"] = category;

        for (var i = 0; i < articleCount; i++) {
            articles.push({
                title: response.data.data.news_list[i].news_obj.title,
                description: response.data.data.news_list[i].news_obj.content,
                source: response.data.data.news_list[i].news_obj.source_name,
                post_url: response.data.data.news_list[i].news_obj.source_url,
                image_url: response.data.data.news_list[i].news_obj.image_url,
                created_at: response.data.data.news_list[i].news_obj.created_at,
            });
        }

        newsResponse["articles"] = articles;

        res.json(newsResponse);

    });

});

app.listen(port, () => {
    console.log('running on port ' + port);
});