import requests
from bs4 import BeautifulSoup

URL = 'https://hh.ru/search/vacancy?area=113&search_field=name&search_field=company_name&search_field=description&text=python&items_on_page=20'

# обойти защиту через заголовки
HEADERS = {
    'Accept-Encoding': 'gzip, deflate, sdch',
    'Accept-Language': 'en-US,en;q=0.8',
    'Upgrade-Insecure-Requests': '1',
    'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
    'Cache-Control': 'max-age=0',
    'Connection': 'keep-alive',
}


def extract_job(html):
    title = html.find('a').text
    link = html.find('a')['href']
    company = html.find('div', {'class': 'vacancy-serp-item__meta-info-company'}).text
    company = company.strip()
    location = html.find('div', {'data-qa': 'vacancy-serp__vacancy-address'}).text
    location = location.partition(',')[0]
    return {title: title, company: company, location: location, link: link}


def extract_max_page():
    hh_request = requests.get(URL, headers=HEADERS)
    pages = []
    hh_soup = BeautifulSoup(hh_request.text, 'html.parser')
    paginator = hh_soup.find_all('span', {'class': 'pager-item-not-in-short-range'})
    for page in paginator:
        pages.append(int(page.find('a').text))
    return pages[-1]

    # for page in range(max_page):
    #     print(f'page={page}')


def extract_hh_jobs(last_page):
    jobs = []
    for page in range(last_page):
        print(f'Парсинг страницы {page}')
        result = requests.get(f'{URL}&page={page}', headers=HEADERS)
        soup = BeautifulSoup(result.text, 'html.parser')
        results = soup.find_all('div', {'class': 'serp-item'})
        for result in results:
            job = extract_job(result)
            jobs.append(job)
    return jobs
