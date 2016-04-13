source 'https://rubygems.org'


# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem 'rails', '4.2.4'
# Use mysql as the database for Active Record
gem 'mysql2', '~> 0.3.20'
# Use SCSS for stylesheets
gem 'sass-rails', '~> 5.0'
# Use Uglifier as compressor for JavaScript assets
gem 'uglifier', '>= 1.3.0'
# Use CoffeeScript for .coffee assets and views
gem 'coffee-rails', '~> 4.1.0'
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'therubyracer', platforms: :ruby

# Use jquery as the JavaScript library
gem 'jquery-rails'
# Turbolinks makes following links in your web application faster. Read more: https://github.com/rails/turbolinks
gem 'turbolinks'
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem 'jbuilder', '~> 2.0'
# bundle exec rake doc:rails generates the API under doc/api.
gem 'sdoc', '~> 0.4.0', group: :doc


############################
# 共通のgem
###########################

# 定数の管理
gem 'config', '~> 1.0.0'
gem 'rails-i18n', '~> 4.0.0'


############################
# web画面のgem
###########################




############################
# 管理画面系のgem
###########################

gem 'activeadmin', '~> 1.0.0.pre2'
# ログイン周り
gem 'devise'

# user auth
gem 'cancancan'


group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem 'byebug'
end

############################
# テスト・デバック用gem
###########################

group :development, :test do
  # Access an IRB console on exception pages or by using <%= console %> in views
  gem 'web-console', '~> 2.0'
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  gem 'spring'

  ## debug gems
  gem 'byebug'
  gem 'pry'
  gem 'pry-rails'
  #gem 'pry-byebug'
  gem "pry-remote"
  gem 'hirb'
  gem 'better_errors'

  ## test gems
  gem 'rspec-rails', "~> 3.1.0"
  gem 'factory_girl_rails', "~> 4.4.1"
  gem "faker", "~> 1.4.3"
  gem "capybara", "~> 2.4.3"
  gem "database_cleaner", "~> 1.3.0"
  gem "autodoc"
  # javascript engine
  gem 'poltergeist'
  gem "launchy", "~> 2.4.2"
  gem "selenium-webdriver", "~> 2.43.0"
  # javascript unit test
  gem 'jasmine-rails'

  gem 'model_schema_info'
end
