class Command::Base
  def initialize(params = {})
  end

  def description
    'No help available for this command.'
  end

  def name
    self.class.name.demodulize.to_s.downcase
  end

  def usage
    "/pair #{name}"
  end
end
