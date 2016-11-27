Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  post '/slack', to: 'slack#handle'
  get '/slack/auth', to: 'slack#create'
end
