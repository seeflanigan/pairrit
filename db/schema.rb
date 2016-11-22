# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20161122013508) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channels", force: :cascade do |t|
    t.string  "name",     null: false
    t.string  "slack_id", null: false
    t.integer "team_id",  null: false
    t.index ["slack_id"], name: "index_channels_on_slack_id", unique: true, using: :btree
    t.index ["team_id"], name: "index_channels_on_team_id", using: :btree
  end

  create_table "pairs", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "channel_id", null: false
    t.index ["channel_id"], name: "index_pairs_on_channel_id", using: :btree
    t.index ["name"], name: "index_pairs_on_name", using: :btree
  end

  create_table "pairs_users", id: false, force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "pair_id", null: false
  end

  create_table "teams", force: :cascade do |t|
    t.string "domain",   null: false
    t.string "slack_id", null: false
    t.index ["slack_id"], name: "index_teams_on_slack_id", unique: true, using: :btree
  end

  create_table "users", force: :cascade do |t|
    t.string  "name",     null: false
    t.string  "slack_id", null: false
    t.integer "team_id",  null: false
    t.index ["slack_id"], name: "index_users_on_slack_id", unique: true, using: :btree
    t.index ["team_id"], name: "index_users_on_team_id", using: :btree
  end

  add_foreign_key "channels", "teams"
  add_foreign_key "pairs", "channels"
  add_foreign_key "users", "teams"
end
